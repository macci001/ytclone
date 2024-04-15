import {configureStore} from "@reduxjs/toolkit";
import AppSlice from "./Slices/AppSlice";

const store = configureStore({
    reducer: {
        app: AppSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export default store;