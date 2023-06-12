import userModel from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.js";


//Εγγραφή ενός νέου χρήστη
const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;    //Τα στοιχεία που εισάγει ο χρήστης

    const checkUser = await userModel.findOne({ username });     //Έλεγχος αν το username που εισάγει ο χρήστης υπάρχει ήδη στη βάση
    if (checkUser)
      return responseHandler.badrequest(res, "username already used");

    //Αλλιώς δημιουργείται νέος χρήστης με τα στοιχεία που εισήχθησαν
    const user = new userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);
    await user.save();     //Αποθήκευση του νέου χρήστη στη βάση

    const token = jsonwebtoken.sign(   //Δημιουργία ενός jwt για την αυθεντικοποίηση του χρήστη
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {   //Response το jwt και τα στοιχεία του νέου χρήστη
      token,
      ...user._doc,
      id: user.id
    });
  } catch {
    responseHandler.error(res);
  }
};


//Σύνδεση ενός χρήστη
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Αναζήτηση του χρήστη με βάση το εισαχθέν username. Αν ο χρήστης βρεθεί επιστρέφονται συγκεκριμένα πεδία του (username, password, salt κ.λ.π)
    const user = await userModel.findOne({ username }).select("username password salt id displayName");   
    if (!user)
      return responseHandler.badrequest(res, "User not exist");
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    //Αν τελικώς τα username και password είναι έκγυρα τότε δημιουργείται ένα jwt για τον χρήστη
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    //'Απομακρύνονται' τα password και salt από τα στοιχεία του χρήστη
    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {   //Response όλων των υπολοίπων στοιχείων του χρήσ
      token,
      ...user._doc,
      id: user.id
    });
  } catch {
    responseHandler.error(res);
  }
};


//Ενημέρωση του password ενός χρήστη
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    //Αναζήτηση του χρήστη με βάση το id και επιστροφή συγκεκριμένων πεδίων του χρήστη
    const user = await userModel.findById(req.user.id).select("password id salt");
    if (!user)
      return responseHandler.unauthorize(res);
    if (!user.validPassword(password))    //Αν το παρεχόμενο και τρέχον password δεν είναι σωστό
      return responseHandler.badrequest(res, "Wrong password");

    //Αν το τρέχον είναι σωστό, τότε αλλάζει το password και αποθηκεύονται οι αλλαγές
    user.setPassword(newPassword);
    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};


//Ανάκτηση των πληροφοριών ενός χρήστη με βάση το id που υπάρχει στο request
const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);   //Αναζήτηση του χρήστη
    if (!user)
      return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {signup, signin, getInfo, updatePassword};