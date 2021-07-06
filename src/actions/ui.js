import { types } from "../types/types";
import { firebase } from '../firebase/firebase-config';
import { notesLogout } from "./notes";

export const setError = (err) => ({
    type: types.uiSetErrors,
    payload: err
});


export const removeError = () => ({
    type: types.uiRemoveErrors
});

export const startLoading = () => ({
    type: types.uiStartingLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});

export const startLogOut = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(notesLogout());
    }
} 

export const logout = () => ({
    type: types.logout
})