import axiosClient from "../axios/axios.js";
import tmdbEndpoints from "./endpoints.js";


//Το object tmdbApi περιέχει μεθόδους με σκοπό την αλληλεπίδραση-επικοινωνία με το API του TMDB
//Οι μέθοδοι αυτές για να αποστείλλουν HTTP requests προς το API, κάνουν χρήση του axiosClient και κατάλληλων endpoints
const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(   //Επιστρέφει μια λίστα ταινιών-σειρών
    tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
  ),
  mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(    //Επιστρέφει τις λεπτομέρειες μιας συγκεκριμένης ταινίας-σειράς
    tmdbEndpoints.mediaDetail({ mediaType, mediaId })
  ),
  mediaGenres: async ({ mediaType }) => await axiosClient.get(    //Επιστρέφει τις κατηγορίες των ταινιών-σειρών
    tmdbEndpoints.mediaGenres({ mediaType })
  ),
  mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(    //Επιστρέφει τους δημιουργούς και τους ηθοποιούς που συμμετέχουν σε μια ταινία-σειρά
    tmdbEndpoints.mediaCredits({ mediaType, mediaId })
  ),
  mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(     //Επιστρέφει τα βίντεο μιας συγκεκριμένης ταινίας-σειράς
    tmdbEndpoints.mediaVideos({ mediaType, mediaId })
  ),
  mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(     //Επιστρέφει τις εικόνες μιας συγκεκριμένης ταινίας-σειράς
    tmdbEndpoints.mediaImages({ mediaType, mediaId })
  ),
  mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(   //Επιστρέφει recommendations για ταινίες-σειρές που είναι παρόμοιες με μια συγκεκριμένη ταινία-σειρά
    tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
  ),
  mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(   //Επιστρέφει αποτελέσματα αναζήτησης ταινιών-σειρών
    tmdbEndpoints.mediaSearch({ mediaType, query, page })
  ),
  personDetail: async ({ personId }) => await axiosClient.get(    //Επιστρέφει λεπτομέρειες για ένα συγκεκριμένο πρόσωπο (π.χ ηθοποιό)
    tmdbEndpoints.personDetail({ personId })
  ),
  personMedias: async ({ personId }) => await axiosClient.get(    //Επιστρέφει τις ταινίες-σειρές στις οποίες συμμετέχει ένα συγκεκριμένο πρόσωπο (π.χ ηθοποιός)
    tmdbEndpoints.personMedias({ personId })
  )
};

export default tmdbApi;