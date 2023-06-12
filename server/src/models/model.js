const modelOptions = {
  toJSON: {          //Για μετατροπή ενός object σε μορφή JSON
    virtuals: true,   //Ενεργοποίηση εικονικών πεδίων, δηλαδή πεδίων που δεν αποθηκεύοτανι απευθείας στη βάση
    transform: (_, obj) => {     
      delete obj._id;     //Αφαίρεση του πεδίου _id από το object, πριν την μετατροπή
      return obj;
    }
  },
  toObject: {        //Για μετατροπή ενός object σε απλό Javascript object
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    }
  },
  versionKey: false,    //Το πεδίο που υποδηλώνει την έκδοση (__v) δεν θα περιλαμβάνεται στο object
  timestamps: true     //Τα πεδία createdAt και updatedAt που υποδηλώνουν την ημερομηνία δημιουργίας και ενημέρωσης του object θα περιλαμβάνονται στο object
};

export default modelOptions;