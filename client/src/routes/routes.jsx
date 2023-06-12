import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import FavoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/ReviewList";
import ProtectedPage from "../components/common/ProtectedPage";


export const routesGen = {
  home: "/",                             //Path για την αρχική σελίδα
  mediaList: (type) => `/${type}`,       //Path για την λίστα ταινιών-σειρών
  mediaDetail: (type, id) => `/${type}/${id}`,    //Path για τις λεπτομέρειες μιας ταινίας-σειράς
  mediaSearch: "/search",                //Path για την σελίδα αναζήτησης ταινιών-σειρών
  person: (id) => `/person/${id}`,       //Path για τις λεπτομέρειες ενός προσώπου (π.χ ηθοποιός)
  favoriteList: "/favorites",            //Path για την σελίδα λίστας 'αγαπημένων' ταινιών-σειρών
  reviewList: "/reviews",                //Path για την σελίδα λίστας κριτικών
  passwordUpdate: "password-update"      //Path για την σελίδα ενημέρωσης του password
};


//Στον παρακάτω πίνακα περιέχονται τα routes (objects του πίνακα) της εφαρμογής συσχετιζόμενα με τα αντίστοιχα components
const routes = [
  {
    index: true,       //Το συγκεκριμένο route είναι προεπιλεγμένο (αρχική σελίδα)
    element: <HomePage />,
    state: "home"      //Το state αντιστοιχεί στην κατάσταση του route, με σκοπό να μπορούμε να ελέγχουμε την κατάσταση της εφαρμογής
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail"
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search"
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update"
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites"
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews"
  },
  {
    path: "/:mediaType",
    element: <MediaList />
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />
  }
];

export default routes;