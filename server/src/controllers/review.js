import responseHandler from "../handlers/response.js";
import reviewModel from "../models/review.js";


//Δημιουργίας μιας νέας κριτικής
const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = new reviewModel({
      user: req.user.id,    //Ο χρήστης που κάνει την κριτική
      movieId,
      ...req.body    //Τα δεδομένα της κριτικής
    });
    await review.save();    //Αποθήκευση της νέας κριτικής στη βάση δεδομένων

    responseHandler.created(res, {    //Response επιτυχημένης δημιουργίας και τα στοιχεία της κριτικής
      ...review._doc,
      id: review.id,
      user: req.user
    });
  } catch {
    responseHandler.error(res);
  }
};


//Αφαίρεση μια κριτικής
const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({   //Αναζήτηση της κριτικής στη βάση δεδομένων
      _id: reviewId,
      user: req.user.id
    });
    if (!review)    //Αν η κριτική δεν βρεθεί
      return responseHandler.notfound(res);
    await review.remove();   //Αν η κριτική βρεθεί, τότε αφαιρείται από την βάση

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};


//Επιστρέφει όλες τις κριτικές ενός χρήστη
const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel.find({
      user: req.user.id
    }).sort("-createdAt");     //Ταξινόμηση των κριτικών με βάση την ημερομηνία δημιουργίας

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };