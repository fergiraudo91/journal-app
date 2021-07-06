import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase-config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadingNotes(user.uid));
        setIsLogged(true);
      }
      else{
          setIsLogged(false);
      }
      setChecking(false);
    });
  }, [dispatch, checking]);

  if (checking) {
    return (
      <div className="spinner">
        <div
          className="spinner-grow text-primary"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLogged} />
        <PrivateRoute path="/" component={JournalScreen} isAuthenticated={isLogged} />
        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};
