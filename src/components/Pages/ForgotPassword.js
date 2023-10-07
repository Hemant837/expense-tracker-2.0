import React, { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailVerificationInputRef = useRef();

  const sendEmailHandler = async (event) => {
    event.preventDefault();
    const enteredVerificationEmail = emailVerificationInputRef.current.value;
    navigate("/");
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
      { requestType: "PASSWORD_RESET", email: enteredVerificationEmail }
    );
  };

  return (
    <div className="w-96 mt-16 h-auto mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-4 mt-4">
        Forgot Password
      </h2>
      <p className="mt-2">Enter the email with which you have registered.</p>
      <form className="mt-4" onSubmit={sendEmailHandler}>
        <input
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          id="forgotPassword"
          type="email"
          placeholder="email"
          ref={emailVerificationInputRef}
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Send Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
