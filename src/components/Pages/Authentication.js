import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Authentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isFormValid, setIsFormValid] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const validateForm = () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Validate that all required fields are filled
    const isValid = enteredEmail.trim() !== "" && enteredPassword.trim() !== "";

    setIsFormValid(isValid);
  };

  const forgotPasswordHandler = (event) => {
    event.preventDefault();
    navigate("/forgot-password");
  };

  const formHandler = async (event) => {
    event.preventDefault();

    validateForm();

    if (!isFormValid) {
      return; // Don't submit if the form is not valid
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE";
    }
    try {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      // Make a POST request to your backend to handle user login or signup
      const response = await axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      });
      setIsLoading(false);
      localStorage.setItem("token", response.data.idToken);

      dispatch(authActions.login());
      dispatch(authActions.setIdToken(response.data.idToken));
      dispatch(authActions.setUserEmail(response.data.email));

      // Handle success
      console.log("Registration successful!", response.data);

      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      if (isLogin) {
        navigate("/welcome");
      } else {
        navigate("/email-verification");
      }
    } catch (error) {
      // Handle errors
      alert("Wrong Credentials");
      setIsLoading(false);
      console.error("Registration failed:", error);
    }
    passwordInputRef.current.value = "";
  };
  return (
    <>
      <div className="w-80 mt-16 h-auto mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form className="text-center" onSubmit={formHandler}>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              type="email"
              id="email"
              placeholder="Email"
              ref={emailInputRef}
              onChange={validateForm}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              type="password"
              id="password"
              placeholder="Password"
              ref={passwordInputRef}
              onChange={validateForm}
            />
          </div>

          {!isLoading && (
            <button
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="submit"
              disabled={!isFormValid}
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
          )}
          {isLoading && (
            <p className="text-center text-primary">Sending Request...</p>
          )}
          {isLogin && (
            <button
              className=" text-blue-700 underline"
              onClick={forgotPasswordHandler}
            >
              Forgot password?
            </button>
          )}
        </form>
      </div>
      <button
        className="mx-auto p-1 bg-green-100 w-80 h-10 mt-4 border border-green-500 rounded-md text-center flex items-center justify-center"
        onClick={switchAuthModeHandler}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Have an account? Sign Up"}
      </button>
    </>
  );
};

export default Authentication;
