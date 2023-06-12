import { createSlice } from "@reduxjs/toolkit";


//Δημιουργία ενός slice στο Redux store. Το slice αφορά το theme mode της εφαρμογής
export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState: {themeMode: "dark"},      //Αρχική κατάσταση του slice
  reducers: {setThemeMode: (state, action) => {state.themeMode = action.payload;}   //Reducer ο οποίος ενημερώνει την τιμή του πεδίου "themeMode" στο state του slice
  }
});


//Εξαγωγή των setThemeMode και reducer από το slice
export const {setThemeMode} = themeModeSlice.actions;
export default themeModeSlice.reducer;