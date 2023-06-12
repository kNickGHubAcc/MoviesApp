import privateClient from "../client/private";
import publicClient from "../client/public";


const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password"
};


//Οι μέθοδοι signin, signup, getInfo και passwordUpdate χρησιμοποιούνται για την αλληλεπίδραση με το API. Για τον σκοπό αυτό
//κάνουν χρήση, είτε ενός αυθεντικοποιημένου client (privateClient), είτε ενός μη αυθεντικοποιημένου client (publicClient)
const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin,       //Αποστολή ενός POST request για την σύνδεση ενός χρήστη
        {username, password}
      );

      return {response};
    } catch (err) {return {err};}
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup,       //Αποστολή ενός POST request για την εγγραφή ενός χρήστη
        {username, password, confirmPassword, displayName}
      );

      return {response};
    } catch (err) {return {err};}
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);     //Αποστολή ενός GET request για την ανάκτηση πληροφοριών ενός χρήστη

      return {response};
    } catch (err) {return {err};}
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate,    //Αποστολή ενός PUT request για την ενημέρωση password ενός χρήστη
        {password, newPassword, confirmNewPassword}
      );

      return {response};
    } catch (err) {return {err};}
  }
};

export default userApi;