import privateClient from "../client/private";


const reviewEndpoints = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`
};


//Οι add, remove και getList χρησιμοποιούνται για την αλληλεπίδραση με το API. Για τον σκοπό αυτό
//κάνουν χρήση ενός αυθεντικοποιημένου client (privateClient)
const reviewApi = {
  add: async ({mediaId, mediaType, mediaTitle, mediaPoster, content}) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add,     //Αποστολή ενός POST request με σκοπό την δημιουργία κριτικών
        {
          mediaId, mediaType, mediaTitle, mediaPoster, content
        }
      );

      return {response};
    } catch (err) {return {err};}
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(reviewEndpoints.remove({ reviewId }));    //Αποστολή ενός DELETE request με σκοπό την διαγραφή κριτικών

      return {response};
    } catch (err) {return {err};}
  },
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);    //Αποστολή ενός GET request με σκοπό την ανάκτηση κριτικών

      return {response};
    } catch (err) {return {err};}
  }
};

export default reviewApi;