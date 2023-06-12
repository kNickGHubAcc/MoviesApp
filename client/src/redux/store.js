import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import userSlice from "./features/userSlice";


//Δημιουργία ενός Redux store με πολλά slices
const store = configureStore({
  reducer: {
    //Καθορίζεται ποιος reducer αντιστοιχεί σε κάθε slice (reducer: slice)
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice
  }
});

export default store;