import publicClient from "../client/public";


const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`
};


//Η getList χρησιμοποιείται για την αλληλεπίδραση με το API. Για τον λόγο αυτό, κάνει χρήση ενός μη αυθεντικοποιημένου client (publicClient)
const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(genreEndpoints.list({ mediaType }));    //Αποστολή ενός GET request με σκοπό την ανάκτηση λίστας με τις κατηγορίες ταινιών-σειρών

      return {response};
    } catch (err) {return {err};}
  }
};

export default genreApi;