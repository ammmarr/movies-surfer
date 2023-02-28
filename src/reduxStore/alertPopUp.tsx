import { createSlice } from '@reduxjs/toolkit'

// Slice

const alertPopUpSlice = createSlice({
    name: 'alertSlice',
    initialState: {value:false},
    reducers: {
        alertPopUp: (state, action) => {
           setTimeout(() => state.value,2000)
        },
    },
});
export const {alertPopUp} = alertPopUpSlice.actions
export default alertPopUpSlice.reducer