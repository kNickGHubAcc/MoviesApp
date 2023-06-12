import { validationResult } from "express-validator";


//Εκτέλεση validation στα δεδομένα ενός request
const validate = (req, res, next) => {
  const errors = validationResult(req);    //Η validationResult ελέγχει αν υπάρχουν σφάλματα στα δεδομένα ενός request
  if (!errors.isEmpty())    //Αν υπάρχουν σφάλματα
    return res.status(400).json({message: errors.array()[0].msg});   //Επιστρέφεται το πρώτο σφάλμα που εντοπίστηκε
    
  next();
};

export default { validate };