import { createSlice } from "@reduxjs/toolkit";


//Δημιουργία ενός slice στο Redux store
export const appStateSlice = createSlice({
  name: "AppState",
  initialState: {appState: ""},      //Αρχική κατάσταση του slice
  reducers: {setAppState: (state, action) => {state.appState = action.payload;}}   //Reducer ο οποίος ενημερώνει την τιμή του πεδίου "appState" στο state του slice
});


//Εξαγωγή των setAppState και reducer από το slice
export const {setAppState} = appStateSlice.actions;
export default appStateSlice.reducer;