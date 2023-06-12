import responseHandler from "../handlers/response.js";
import tmdbApi from "../tmdb/api.js";


//Ανακτά λεπτομερείς πληροφορίες για έναν ηθοποιό με βάση το id
const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await tmdbApi.personDetail({ personId });   //Ανάκτηση από το tmbdApi

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};


//Ανακτά τις ταινίες-σειρές στις οποίες έχει συμμετάσχει ο ηθοποιός, με βάση το id
const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;
    const medias = await tmdbApi.personMedias({ personId });   //Ανάκτηση από το tmbdApi

    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };