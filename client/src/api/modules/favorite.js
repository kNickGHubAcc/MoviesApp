import privateClient from "../client/private";


const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`
};


//Οι μέθοδοι getList, add, και remove χρησιμοποιούνται για την αλληλεπίδραση με το API, με σκοπό την διαχείριση των
//'αγαπημένων' ταινιών-σειρών. Για τον σκοπό αυτό κάνουν χρήση ενός αυθεντικοποιημένου client (privateClient)
const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list);     //Αποστολή ενός GET request στην διεύθυνση favoriteEndpoints.list με σκοπό την ανάκτηση της λίστας 'αγαπημένων'

      return {response};
    } catch (err) {
      return {err};
    }
  },
  add: async ({mediaId, mediaType, mediaTitle, mediaPoster,mediaRate}) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add,      //Αποστολή ενός POST request με σκοπό την προσθήκη μιας νέας 'αγαπημένης' ταινίας-σειράς
      {
        mediaId, mediaType, mediaTitle, mediaPoster, mediaRate
      });

      return {response};
    } catch (err){
      return {err};
    }
  },
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }));    //Αποστολή ενός DELETE request με σκοπό την αφαίρεση μιας ΄αγαπημένης΄ ταινίας-σειράς

      return {response};
    } catch (err) {
      return {err};
    }
  }
};

export default favoriteApi;