import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center bg-blue-500 h-16 text-white shadow">
      <h2 className="ml-2 font-bold text-xl">Expense Tracker</h2>
      <ul className="flex mx-auto justify-evenly w-96">
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
    </div>
  );
};

export default Navbar;
