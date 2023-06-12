import privateClient from "../client/private";
import publicClient from "../client/public";


const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) => `${mediaType}/search?query=${query}&page=${page}`
};


//Οι μέθοδοι getList, getDetail, και search χρησιμοποιούνται για την αλληλεπίδραση με το API. Για τον σκοπό αυτό
//κάνουν χρήση, είτε ενός αυθεντικοποιημένου client (privateClient), είτε ενός μη (publicClient)
const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.list({ mediaType, mediaCategory, page }));  //Αποστολή ενός GET request με σκοπό την ανάκτηση της λίστας ταινιών-σειρών

      return {response};
    } catch (err) {return {err};}
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(mediaEndpoints.detail({ mediaType, mediaId }));   //Αποστολή ενός GET request με σκοπό την ανάκτηση λεπτομερειών για μια ταινία-σειρά

      return {response};
    } catch (err) {return {err};}
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.search({ mediaType, query, page }));   //Αποστολή ενός GET request με σκοπό την αναζήτηση ταινιών-σειρών

      return {response};
    } catch (err) {return {err};}
  }
};

export default mediaApi;