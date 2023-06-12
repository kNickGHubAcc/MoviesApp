import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.js";
import userModel from "../models/user.js";


//Αποκρυπτογράφηση του JWT token
const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];   //O header 'Authorization' του request ανατίθεται σε κατάλληλη μεταβλητή
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];    //Εξαγωγή του token από την συμβολοσειρά 'bearerHeader'

      return jsonwebtoken.verify(    //Αν το token είναι έγκυρο, επιστρέφεται το αποκρυπτογραφημένο περιεχόμενό του
        token,
        process.env.TOKEN_SECRET
      );
    }
    return false;
  } catch {
    return false;
  }
};


//Αυθεντικοποίηση των requests
const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);    //Αποκρυπτογράφηση του token
  if (!tokenDecoded)
    return responseHandler.unauthorize(res);

  const user = await userModel.findById(tokenDecoded.data);   //Αναζήτηση του χρήστη στον οποίο αντιστοιχεί το αποκρυπτογραφημένο token
  if (!user)
    return responseHandler.unauthorize(res);

  req.user = user;   //Αν ο χρήστης βρεθεί τότε προστίθεται στο request
  next();
};

export default { auth, tokenDecode };