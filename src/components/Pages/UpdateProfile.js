import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import formatEmail from "../Function/FormatEmail";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { darkThemeActions } from "../../store/darkTheme";

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [isProfileUpdate, setIsProfileUpdate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const nameInputRef = useRef("");
  const pUrlRef = useRef("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
          { idToken: localStorage.getItem("token") }
        );
        const newResponse = await axios.get(
          `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
            response.data.users[0].email
          )}/updatedProfile.json`
        );
        setIsProfileUpdate(true);
        setIsEditing(false);
        dispatch(authActions.login());
        nameInputRef.current.value = newResponse.data.displayName;
        pUrlRef.current.value = newResponse.data.photoUrl;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const enableEditing = () => {
    setIsEditing(true);
  };

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

      setIsEditing(false);
      console.log(response.data);
      console.log(response.data.email);

      const newResponse = await axios.put(
        `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
          response.data.email
        )}/updatedProfile.json`,

        { displayName: enteredName, photoUrl: enteredPUrl }
      );
      console.log(newResponse.data);
      setIsProfileUpdate(true);
      // alert("Your Profile is Updated Sucessfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`my-4 ${
        darkTheme ? "bg-black text-white" : "bg-blue-500 text-white"
      }`}
    >
      <div className="flex justify-around items-center bg-blue-500 text-white py-2">
        <p className="text-lg font-semibold">
          "Winners never quit, quitters never win."
        </p>
        <div className="bg-orange-300 text-white rounded-lg p-2 flex items-center">
          <p className="text-sm">
            Your profile is{" "}
            <b className="text-blue-600">{isProfileUpdate ? "100%" : "64%"}</b>
            completed. A complete Profile has higher chances of landing a job.
          </p>
          {!isEditing && (
            <button
              className={`ml-2 px-3 py-1 ${
                darkTheme
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              onClick={enableEditing}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <form
        className={`mx-auto mt-4 p-4 border border-gray-300 rounded-lg ${
          darkTheme ? "bg-black text-white" : "bg-white text-black"
        }`}
        onSubmit={updateProfileHandler}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold">Contact Details</p>
          {isEditing && (
            <button
              className={`text-${
                darkTheme ? "white" : "blue-600"
              } hover:underline`}
              onClick={() => setIsEditing(false)} // Clicking "Cancel" turns off edit mode
            >
              Cancel
            </button>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="name" className="w-1/3 text-right pr-2">
              Full Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-2/3 px-2 py-1 text-black rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              ref={nameInputRef}
              readOnly={!isEditing} // Make the input readonly when not in edit mode
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="p-url" className="w-1/3 text-right pr-2">
              Profile Photo URL:
            </label>
            <input
              id="p-url"
              type="url"
              className="w-2/3 px-2 py-1 text-black rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              ref={pUrlRef}
              readOnly={!isEditing} // Make the input readonly when not in edit mode
            />
          </div>
          {isEditing && (
            <button
              className={`w-1/3 mx-auto px-3 py-2 ${
                darkTheme
                  ? "bg-white text-black"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              type="submit"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;
