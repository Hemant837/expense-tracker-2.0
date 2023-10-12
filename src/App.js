import React, { useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Pages/Root";
import Authentication from "./components/Pages/Authentication";
import WelcomePage from "./components/Pages/WelcomePage";
import UpdateProfile from "./components/Pages/UpdateProfile";
import EmailVerification from "./components/Pages/EmailVerification";
import ForgotPassword from "./components/Pages/ForgotPassword";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { expensesActions } from "./store/expense";
import formatEmail from "./components/Function/FormatEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Authentication /> },
      {
        path: "/welcome",
        element: <WelcomePage />,
      },
      { path: "/update-profile", element: <UpdateProfile /> },
      { path: "/sign-in", element: <Authentication /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
  { path: "/email-verification", element: <EmailVerification /> },
]);

const App = () => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();
  // useffect for user validation

  useEffect(() => {
    const idToken = localStorage.getItem("token");

    const validateUser = async (idToken) => {
      if (idToken) {
        try {
          const { data } = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
            { idToken: idToken }
          );

          // storing the token and email into redux store

          dispatch(authActions.login());
          dispatch(authActions.setIdToken(idToken));
          dispatch(authActions.setUserEmail(data.users[0].email));
        } catch (error) {
          console.log(error);
        }
      }
    };
    validateUser(idToken);
  }, []);

  useEffect(() => {
    const fetchUserExpenses = async (userEmail) => {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBD17gSdbGkKc24yZR25v2eG7khNSNiLuE",
          { idToken: localStorage.getItem("token") }
        );
        console.log(response.data);
        const newResponse = await axios.get(
          `https://expense-tracker-9f544-default-rtdb.firebaseio.com/${formatEmail(
            response.data.users[0].email
          )}/expenseDetails.json`
        );
        const newItems = Object.keys(newResponse.data).map((key) => {
          return dispatch(
            expensesActions.setExpenses({
              firebaseId: key,
              ...newResponse.data[key],
            })
          );
        });
        console.log(newItems);
        // dispatch(expensesActions.setExpenses(newItems));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserExpenses(userEmail);
  }, [userEmail]);

  return <RouterProvider router={router} />;
};

export default App;
