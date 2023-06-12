import axios from "axios";
import queryString from "query-string";


const baseURL = "https://moonflix-api.vercel.app/api/v1/";


const publicClient = axios.create({baseURL,
  paramsSerializer: {encode: params => queryString.stringify(params)}
});


//Η διαφορά με τον request interceptor του privateClient (private.js) είναι ότι, στον publicClient δεν 
//προστίθεται authorization token στο request
publicClient.interceptors.request.use(async config => {
  return {...config,
    headers: {"Content-Type": "application/json"}
  };
});


publicClient.interceptors.response.use((response) => {
  if (response && response.data){
    return response.data;
  }
  return response;
}, (err) => {
  throw err.response.data;
});

export default publicClient;