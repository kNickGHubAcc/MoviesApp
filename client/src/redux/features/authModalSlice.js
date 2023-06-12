import { createSlice } from "@reduxjs/toolkit";


//Δημιουργία ενός slice στο Redux store. To slice αφορά το authentication modal της εφαρμογής
export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {authModalOpen: false},       //Αρχική κατάσταση του slice
  reducers: {setAuthModalOpen: (state, action) => {state.authModalOpen = action.payload;}    //Reducer ο οποίος ενημερώνει την τιμή του πεδίου "authModalOpen" στο state του slice
  }
});


//Εξαγωγή των setAuthModalOpen και reducer από το slice
export const {setAuthModalOpen} = authModalSlice.actions;
export default authModalSlice.reducer;