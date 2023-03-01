import { createSlice } from '@reduxjs/toolkit'

// Slice

const popUpSlice = createSlice({
    name: 'popUpSlice',
    initialState: {value:false},
    reducers: {
        popUpIsOpen: (state, action) => {
           state.value = action.payload
        },
    },
});
export const {popUpIsOpen} = popUpSlice.actions
export default popUpSlice.reducer