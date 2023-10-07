import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Pages/Root";
import SignIn from "./components/Pages/SignIn";
import WelcomePage from "./components/Pages/WelcomePage";
import UpdateProfile from "./components/Pages/UpdateProfile";
import EmailVerification from "./components/Pages/EmailVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <SignIn /> },
      {
        path: "/welcome",
        element: <WelcomePage />,
      },
      { path: "/update-profile", element: <UpdateProfile /> },
      { path: "/sign-in", element: <SignIn /> },
    ],
  },
  { path: "/email-verification", element: <EmailVerification /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
