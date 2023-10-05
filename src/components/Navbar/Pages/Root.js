import { Outlet } from "react-router";
import Navbar from "../Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
};

export default RootLayout;
