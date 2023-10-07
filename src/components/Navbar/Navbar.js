import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div className="flex items-center justify-around bg-blue-500 h-16 text-white shadow">
      <h2 className=" font-bold text-xl">Expense Tracker</h2>
      <ul className="flex justify-evenly w-96">
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Products</a>
        </li>
        <li>
          <a>About Us</a>
        </li>
      </ul>
      <button
        className=" bg-white text-black font-semibold rounded p-1.5 hover:bg-gray-100"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
