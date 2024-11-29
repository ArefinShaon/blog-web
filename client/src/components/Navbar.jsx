import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../images/logo.svg";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutNavbar = () => {
    logout();
    navigate("/login");
  };

  const navItems = (
    <>
      <li className="relative group font-bold">
        <span className="cursor-pointer ">
          {" "}
          <span className="font-bold">What You Like to Read!!</span>
        </span>
        {/* Dropdown Menu */}
        <ul className="absolute hidden group-hover:block w-40 mx-auto bg-amber-100 rounded-md mt-8 z-10">
          <li>
            <Link to="/?cat=art" className="block mx-9 py-2 hover:bg-amber-200">
              Art
            </Link>
          </li>
          <li>
            <Link
              to="/?cat=science"
              className="block px-4 py-2 mx-auto hover:bg-amber-200"
            >
              Science
            </Link>
          </li>
          <li>
            <Link
              to="/?cat=technology"
              className="block px-4 py-2 mx-auto hover:bg-amber-200"
            >
              Technology
            </Link>
          </li>
          <li>
            <Link
              to="/?cat=cinema"
              className="block px-4 py-2 mx-auto hover:bg-amber-200"
            >
              Cinema
            </Link>
          </li>
          <li>
            <Link
              to="/?cat=design"
              className="block px-4 py-2 mx-auto hover:bg-amber-200"
            >
              Design
            </Link>
          </li>
          <li>
            <Link
              to="/?cat=food"
              className="block px-4 py-2 mx-auto hover:bg-amber-200"
            >
              Food
            </Link>
          </li>
        </ul>
      </li>

      {currentUser ? (
        <>
          <li>
            <Link
              className=" px-5 mr-2"
              to="/myblog"
            >
              <span className="font-bold">My Blogs</span>
            </Link>
          </li>

          <li>
            <Link
              className="btn bg-green-500 border-green-500 btn-success px-5 mr-2"
              to="/write"
            >
              <span className="font-bold">Write Now😊</span>
            </Link>
          </li>

          <span
            className="btn bg-red-500 border-red-400 btn-circle px-8"
            onClick={logoutNavbar}
          >
            <span className="font-bold"> Logout</span>
          </span>
        </>
      ) : (
        <Link
          className="btn btn-circle w-20 bg-green-500 border-green-500"
          to="/login"
        >
          <span className="font-bold">Login</span>
        </Link>
      )}
    </>
  );

  return (
    <div className="navbar fixed text-black h-20 z-50 top-0 bg-amber-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] h-64 bg-amber-200 p-2 shadow rounded-box font-bold w-52"
          >
            {navItems}
          </ul>
        </div>

        <Link className="btn btn-ghost normal-case text-xl" to="/">
          <img src={Logo} alt="Logo" priority={true} />
        </Link>
      </div>
      <div className="navbar-end font-bold hidden lg:flex md:mr-20">
        <ul className="menu menu-horizontal px-1 text-center items-center font-bold">
          {navItems}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
