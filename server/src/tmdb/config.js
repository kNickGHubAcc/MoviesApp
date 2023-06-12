const baseUrl = process.env.TMDB_BASE_URL;    //Βασικό URL για το API του TMDB
const key = process.env.TMDB_KEY;     //Κλειδί πρόσβασης για το API του TMDB


//Η παράμετρος endpoint αναπαριστά το path της URL και το params είναι ένα object με τα παραμετροποιημένα δεδομένα που πρέπει να προστεθούν στην URL
const getUrl = (endpoint, params) => {    
  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;   //Επιστρέφεται μια URL η οποία θα χρησιμοποιηθεί για τα requests προς το API του TMDB
};

export default { getUrl };