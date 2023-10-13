import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { darkThemeActions } from "../../store/darkTheme";

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const totalExpense = useSelector((state) => state.expenses.totalAmount);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDarkTheme = () => {
    dispatch(darkThemeActions.toggleTheme());
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
    dispatch(authActions.setIdToken(null));
    dispatch(authActions.setUserEmail(null));

    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  // useEffect to handle the dark theme logic when totalExpense changes
  useEffect(() => {
    if (totalExpense < 10000 && darkTheme) {
      dispatch(darkThemeActions.toggleTheme());
    }
  }, [totalExpense, darkTheme, dispatch]);

  return (
    <div
      className={`flex items-center justify-around ${
        darkTheme ? "bg-black text-white" : "bg-blue-500 text-white"
      } h-16 shadow`}
    >
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
            className={`${
              darkTheme ? "bg-white text-black" : "bg-white text-black"
            } font-semibold rounded p-1.5 hover:bg-gray-100`}
            onClick={logoutHandler}
          >
            Logout
          </button>
          {totalExpense >= 10000 && (
            <button
              className={`${
                darkTheme ? "bg-white text-black" : "bg-white text-black"
              } font-semibold rounded p-1.5 hover:bg-gray-100 ml-2`}
              onClick={toggleDarkTheme}
            >
              Dark
            </button>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
