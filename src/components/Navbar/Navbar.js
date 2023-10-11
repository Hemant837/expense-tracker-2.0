import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
    dispatch(authActions.setIdToken(null));
    dispatch(authActions.setUserEmail(null));

    // localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div className="flex items-center justify-around bg-blue-500 h-16 text-white shadow">
      <h2 className="font-bold text-xl">Expense Tracker</h2>
      {isAuth && (
        <nav className="flex items-center">
          <ul className="flex justify-evenly w-96">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
          </ul>
          <button
            className="bg-white text-black font-semibold rounded p-1.5 hover:bg-gray-100"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
