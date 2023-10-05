import React, { Fragment } from "react";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Navbar/Pages/SignUp";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <SignUp />
    </Fragment>
  );
};

export default App;
