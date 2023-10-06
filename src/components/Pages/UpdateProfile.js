import React, { useRef } from "react";
import axios from "axios";

const CompleteProfile = () => {
  const nameInputRef = useRef("");
  const pUrlRef = useRef("");

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPUrl = pUrlRef.current.value;

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
        {
          idToken: localStorage.getItem("token"),
          displayName: enteredName,
          photoUrl: enteredPUrl,
          returnSecureToken: true,
        }
      );
      console.log(response.data);
      alert("Your Profile is Updated Sucessfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4">
      <div className="flex justify-around items-center bg-blue-500 text-white py-2">
        <p className="text-lg font-semibold">
          "Winners never quit, quitters never win."
        </p>
        <div className="bg-orange-300 text-white rounded-lg p-2 flex items-center">
          <p className="text-sm">
            Your profile is <b className="text-blue-600">64%</b> completed. A
            complete Profile has higher chances of landing a job.
          </p>
          <button className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
            Complete Now
          </button>
        </div>
      </div>
      <form className="mx-auto mt-4 p-4 border border-gray-300 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold">Contact Details</p>
          <button className="text-blue-600 hover:underline">Cancel</button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="name" className="w-1/3 text-right pr-2">
              Full Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-2/3 px-2 py-1 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="p-url" className="w-1/3 text-right pr-2">
              Profile Photo URL:
            </label>
            <input
              id="p-url"
              type="url"
              className="w-2/3 px-2 py-1 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>
          <button
            className="w-1/3 mx-auto px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={updateProfileHandler}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;
