import publicClient from "../client/public";


const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`
};


//Οι μέθοδοι detail και medias χρησιμοποιούνται για την αλληλεπίδραση με το API. Για τον σκοπό αυτό
//κάνουν χρήση ενός μη αυθεντικοποιημένου client (publicClient)
const personApi = {
  detail: async ({ personId }) => {
    try {
      const response = await publicClient.get(personEndpoints.detail({ personId }));    //Αποστολή ενός GET request με σκοπό την ανάκτηση λεπτομερειών για ένα συγκεκριμένο πρόσωπο

      return {response};
    } catch (err) {return {err};}
  },
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.get(personEndpoints.medias({ personId }));   //Αποστολή ενός GET request με σκοπό την ανάκτηση των μέσων ενός συγκεκριμένου προσώπου

      return {response};
    } catch (err) {return {err};}
  }
};

export default personApi;