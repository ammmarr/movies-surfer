import { createSlice } from '@reduxjs/toolkit'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const currentUserSlice = createSlice({
    name: 'currentUserSlice',
    initialState: {
        name: "",
        watchLater: [] as any[],
    },
    reducers: {
        SetCurrentUserWatchLater: (state, action) => {
            state.watchLater = action.payload
        },
        setCurrentUserUserName: (state, action) => {
            state.name = action.payload
        },
        logOut: (state, action) => {
            state.name = "",
            state.watchLater = []
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
                console.error(error)
              });
        }
    },
});
export const { SetCurrentUserWatchLater, setCurrentUserUserName, logOut } = currentUserSlice.actions
export default currentUserSlice.reducer