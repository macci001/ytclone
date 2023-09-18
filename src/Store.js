import {configureStore} from "@reduxjs/toolkit";
import AppSlice from "./Slices/AppSlice";

const store = configureStore({
    reducer: {
        app: AppSlice
    }
})

export default store;