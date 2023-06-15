import axios from "axios";
import queryString from "query-string";


const baseURL = "https://my-movies-app-server.vercel.app/api/v1/";     //Βασική διεύθυνση URL του API


//Δημιουργία ενός HTTP client με χρήση Axios, για αποστολή requests στον server
const privateClient = axios.create({baseURL,
  paramsSerializer: {encode: params => queryString.stringify(params)}    //Οι παράμετροι των requests θα μετατρέπονται σε μια κωδικοποιημένη σειρά
});


//Request interceptor ο οποίος προσθέτει επιπλέον πληροφορίες στο client request, πριν αυτό αποσταλλεί
privateClient.interceptors.request.use(async config => {
  return {...config,
    headers: {
      "Content-Type": "application/json",       //Προσθήκη του τύπου περιεχομένου (JSON) στους headers του request
      "Authorization": `Bearer ${localStorage.getItem("actkn")}`    //Προσθήκη του authorization token στο request, το οποίο token ανακτάται από τον localstorage
    }
  };
});


//Response interceptor ο οποίος ελέγχει το response που λαμβάνεται από τον server
privateClient.interceptors.response.use((response) => {
  if (response && response.data){
    return response.data;
  }
  return response;
}, (err) => {
  throw err.response.data;
});

export default privateClient;