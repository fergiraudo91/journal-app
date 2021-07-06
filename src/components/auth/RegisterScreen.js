import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";


export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msError } = useSelector(state => state.ui);

  const [inputValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = inputValues;

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password, password2);
    if (isFormValid()) {
      dispatch(startRegisterEmailPasswordName(name, email, password));
    }
  };

  const isFormValid = () => {
    if (name.trim().length <= 2) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters long and match each other"
        )
      );
      return false;
    }

    dispatch(removeError());

    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form 
      className="animate__animated animate__fadeIn"
      onSubmit={handleRegister}>
        {

         msError && <div className="auth__alert-error">{msError}</div>
        }
        <input
          type="text"
          autoComplete="off"
          placeholder="Name"
          name="name"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          name="email"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="*******"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link className="link" to="/auth/register mt-5">
          Alredy Register?
        </Link>
      </form>
    </>
  );
};
