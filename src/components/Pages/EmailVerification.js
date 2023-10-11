import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router";

const EmailVerification = () => {
  const idToken = useSelector((state) => state.auth.idToken);
  //   const emailInputRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const enteredEmail = emailInputRef.current.value;

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
        { requestType: "VERIFY_EMAIL", idToken: idToken }
      );
      navigate("/welcome");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-80 mt-16 h-auto mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Verify User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* <label htmlFor="email" className="mb-2 font-medium text-gray-700">
          Email
        </label>
        <input
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          id="email"
          type="email"
          ref={emailInputRef}
          required
        /> */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300 focus:ring focus:ring-blue-500 focus:outline-none"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
