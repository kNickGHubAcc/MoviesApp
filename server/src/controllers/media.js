import responseHandler from "../handlers/response.js";
import tmdbApi from "../tmdb/api.js";
import userModel from "../models/user.js";
import favoriteModel from "../models/favorite.js";
import reviewModel from "../models/review.js";
import tokenMiddlerware from "../middlewares/token.js";


//Επιστρέφει μια λίστα ταινιών-σειρών με βάση τον τύπο και την κατηγορία στην οποία ανήκει η κάθε ταινία-σειρά
const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });    //Ανάκτηση της λίστας από το tmdbApi

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};


//Επιστρέφει τις κατηγορίες των ταινιών-σειρών με βάση τον τύπο της κάθε ταινίας-σειράς
const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });    //Ανάκτηση των κατηγοριών από το tmdbApi

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};


//Επιστρέφει τα 'αποτελέσματα' αναζήτησης με βάση τον τύπο της ταινίας-σειράς και το κέιμενο αναζήτησης του χρήστη
const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({    //Ανάκτηση των αποτελεσμάτων αναζήτησης από το tmdbApi
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType    //Αν ο τύπος της ταινίας-σειράς έχει τιμή 'people' τότε όρισε του την τιμή 'person', αλλιώς η τιμή του παραμένει αμετάβλητη
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};


//Επιστρέφει λεπτομερείς πληροφορίες μιας ταινίας-σειράς με βάση τον τύπο και το id της ταινίας-σειράς
const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };    //Ο τύπος και τo id αποθηκεύονται στην μεταβλητή params

    const media = await tmdbApi.mediaDetail(params);    //Ανάκτηση λεπτομερειών για την ταινία-σειρά (params), από το tmdbApi
    media.credits = await tmdbApi.mediaCredits(params);  //Ανάκτηση των credits (π.χ ηθοποιοί) για την ταινία-σειρά (params), από το tmdbApi 

    const videos = await tmdbApi.mediaVideos(params); 
    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);    //Αποκωδικοποίηση του token που περιέχονταν στο request του χρήστη
    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);   //Αναζήτηση του χρήστη στον οποίο αντιστοιχεί το αποκωδικοποιημένο token
      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });   //Αναζήτηση αν η ταινία-σειρά ανήκει στις 'αγαπημένες' του χρήστη
        media.isFavorite = isFavorite !== null;
      }
    }
    //Επιστροφή κριτικών για την ταινία-σειρά καθώς και επιστροφή των στοιχείων χρήστη που έκανε την κριτική. Γίνεται ταξινόμηση των κριτικών με βάση την ημερομηνία δημιουργίας (φθίνουσα)
    media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default {getList, getGenres, search, getDetail};