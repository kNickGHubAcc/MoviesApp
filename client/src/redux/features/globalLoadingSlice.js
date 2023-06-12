import { createSlice } from "@reduxjs/toolkit";


//Δημιουργία ενός slice στο Redux store. Το slice αφορά το global loading της εφαρμογής
export const globalLoadingSlice = createSlice({
  name: "AuthModal",
  initialState: {globalLoading: false},      //Αρχική κατάσταση του slice
  reducers: {setGlobalLoading: (state, action) => {state.globalLoading = action.payload;}  //Reducer ο οποίος ενημερώνει την τιμή του πεδίου "globalLoading" στο state του slice
  }
});


//Εξαγωγή των setGlobalLoading και reducer από το slice
export const {setGlobalLoading} = globalLoadingSlice.actions;
export default globalLoadingSlice.reducer;