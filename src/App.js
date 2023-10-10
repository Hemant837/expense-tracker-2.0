import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Pages/Root";
import Authentication  from "./components/Pages/Authentication";
import WelcomePage from "./components/Pages/WelcomePage";
import UpdateProfile from "./components/Pages/UpdateProfile";
import EmailVerification from "./components/Pages/EmailVerification";
import ForgotPassword from "./components/Pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Authentication  /> },
      {
        path: "/welcome",
        element: <WelcomePage />,
      },
      { path: "/update-profile", element: <UpdateProfile /> },
      { path: "/sign-in", element: <Authentication  /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
  { path: "/email-verification", element: <EmailVerification /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
