import axios from "axios";

//Η get πραγματοποιεί ένα GET request σε μια καθορισμένη URL
const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",     //Ο client αναμένει το response σε μορφή JSON
      "Accept-Encoding": "identity"   //Ο client μπορεί να αποδέχτεί μη κωδικοποιημένο περιεχόμενο
    }
  });
  return response.data;    //Επιστρέφονται τα δεδομένα του response
};

export default {get};