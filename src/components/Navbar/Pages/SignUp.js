import React, { useRef, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    // Validate that all required fields are filled
    const isValid =
      enteredEmail.trim() !== "" &&
      enteredPassword.trim() !== "" &&
      enteredConfirmPassword.trim() !== "";

    setIsFormValid(isValid);
  };

  const formHandler = async (event) => {
    event.preventDefault();

    validateForm();

    if (!isFormValid) {
      return; // Don't submit if the form is not valid
    }

    try {
      const enteredEmail = emailInputRef.current.value; 
      const enteredPassword = passwordInputRef.current.value; 
      // Make a POST request to your backend to handle user registration
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }
      );

      // Handle success
      console.log("Registration successful!", response.data);
    } catch (error) {
      // Handle errors
      console.error("Registration failed:", error);
    }
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };
  return (
    <>
      <div className="w-80 mt-16 h-auto mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
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
          <div className="mb-6">
            <input
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
              onChange={validateForm}
            />
          </div>
          <button
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="submit"
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="mx-auto p-1 bg-green-100 w-80 h-10 mt-4 border border-green-500 rounded-md text-center">
        Have an account? Login
      </div>
    </>
  );
};

export default SignUp;
