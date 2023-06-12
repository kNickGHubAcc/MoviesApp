import responseHandler from "../handlers/response.js";
import favoriteModel from "../models/favorite.js";


//Προσθήκη μιας ταινίας στις 'αγαπημένες'
const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({  //Αναζήτηση της 'αγαπημένης' ταινίας
      user: req.user.id,
      mediaId: req.body.mediaId
    });
    if (isFavorite){     //Αν βρεθεί η 'αγαπημένη΄ ταινία
      return responseHandler.ok(res, isFavorite);
    }
    
    const favorite = new favoriteModel({   //Δημιουργία νέου αντικειμένου 'αγαπημένης ταινίας'
      ...req.body,
      user: req.user.id
    });
    await favorite.save();   //Αποθήκευση της νέας ταινίας στις 'αγαπημένες'

    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};


//Αφαίρεση μιας ταινίας από τις 'αγαπημένες'
const removeFavorite = async (req, res) => {
  try {
    const {favoriteId} = req.params;
    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId
    });
    if (!favorite)     //Αν η ταινία δεν βρεθεί στις 'αγαπημένες'
      return responseHandler.notfound(res);

    await favorite.remove();    //Αν η ταινία βρεθεί στις 'αγαπημένες' τότε αφαίρείται από αυτές

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};


//Μέθοδος που επιστρέφει όλες τις αγαπημένες ταινίες ενός χρήστη
const getFavoritesOfUser = async (req, res) => {
  try {
    //Αναζήτηση των αγαπημένων ταινιών ενός χρήστη και ταξινόμηση αυτών με φθίνουσα σειρά βάση της ημερομηνίας που κάθε ταινία ορίστηκε ως αγαπημένη
    const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");   

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default {addFavorite, removeFavorite, getFavoritesOfUser};