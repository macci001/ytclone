import {createSlice} from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: 'app',
    initialState: {
        isSideBarOn: false
    },
    reducers: {
        toggleSideBar: function toggleSideBarAction(state, action) {
            state.isSideBarOn = !state.isSideBarOn;
        }
    }
});

export const {toggleSideBar} = AppSlice.actions;
export default AppSlice.reducer;