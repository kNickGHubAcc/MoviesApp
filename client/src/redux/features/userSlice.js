import { createSlice } from "@reduxjs/toolkit";


//Δημιουργία ενός slice στο Redux store. Το slice αφορά τον 'User' της εφαρμογής
export const userSlice = createSlice({
  name: "User",
  initialState: {user: null,listFavorites: []},      //Αρχική κατάσταση του slice
  reducers: {           //Οι Reducers αναλαμβάνουν να ενημερώσουν το state του slice με βάση τα actions που παρέχονται
    setUser: (state, action) => {       //Ενημερώνει το πεδίο 'user' του state
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)     //Αν υπάρχει πεδίο 'token' στο payload
          localStorage.setItem("actkn", action.payload.token);    //Αποθηκεύει την τιμή του πεδίου 'token' στο localStorage
      }
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {     //Eνημερώνει το πεδίο 'listFavorites' του state
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {       //Aφαιρεί μια 'αγαπημένη' ταινία-σειρά από την λίστα 'listFavorites' του state
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(e => e.mediaId.toString() !== mediaId.toString());
    },
    addFavorite: (state, action) => {         //Προσθέτει μια 'αγαπημένη' ταινία-σειρά στην αρχή της λίστας 'listFavorites' του state
      state.listFavorites = [action.payload, ...state.listFavorites];
    }
  }
});


//Εξαγωγή των actions (setUser κ.λ.π) και reducer από το slice
export const {setUser, setListFavorites, addFavorite, removeFavorite} = userSlice.actions;
export default userSlice.reducer;