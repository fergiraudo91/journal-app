import Swal from 'sweetalert2';
import { types } from "../types/types";
import { firebase, googleAddProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        Swal.fire('Error', e.message, 'error');
        dispatch(finishLoading());
      });
  };
};

export const startRegisterEmailPasswordName = (name, email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const googleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAddProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};
