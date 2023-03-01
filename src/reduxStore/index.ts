// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { configureStore, current,  } from "@reduxjs/toolkit";
import moviesSlice from "./apiData";
import popUpSlice from "./popUp";
import currentUserSlice from "./currentUser"
import alertPopUp from "./alertPopUp";

const store = configureStore({
    reducer:{
        apiData: moviesSlice,
        popUp: popUpSlice,
        currentUser: currentUserSlice,
        alertPopUp: alertPopUp,
    }
})

export type RootState = ReturnType<typeof store.getState>




export default store