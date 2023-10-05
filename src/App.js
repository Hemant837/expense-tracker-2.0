import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Navbar/Pages/Root";
import SignIn from "./components/Navbar/Pages/SignIn";
import WelcomePage from "./components/Navbar/Pages/WelcomePage";

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
