import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow fixed w-full top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Left Side - Logo */}
        <Link to="/" className="no-underline" onClick={closeMenu}>
          <h1 className="text-2xl font-bold flex items-center">
            RateYourStore <FaShoppingCart className="text-3xl ml-2" />
          </h1>
        </Link>

        {/* Hamburger - Mobile only */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-blue-500 md:bg-transparent md:flex space-y-3 md:space-y-0 md:space-x-3 px-6 py-4 md:py-0 font-semibold md:items-center`}
        >
          <Link
            to="/about"
            onClick={closeMenu}
            className="block hover:bg-blue-600 px-3 py-1 rounded transition"
          >
            About
          </Link>

          {user ? (
            <>
              {user.role === "system_admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={closeMenu}
                    className="block hover:bg-blue-600 px-3 py-1 rounded transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/users"
                    onClick={closeMenu}
                    className="block hover:bg-blue-600 px-3 py-1 rounded transition"
                  >
                    Manage Users
                  </Link>
                  <Link
                    to="/admin/ratings"
                    onClick={closeMenu}
                    className="block hover:bg-blue-600 px-3 py-1 rounded transition"
                  >
                    Manage Ratings
                  </Link>
                </>
              )}
              {user.role === "store_owner" && (
                <Link
                  to="/store-owner/dashboard"
                  onClick={closeMenu}
                  className="block hover:bg-blue-600 px-3 py-1 rounded transition"
                >
                  Dashboard
                </Link>
              )}
              {user.role === "normal_user" && (
                <Link
                  to="/user/dashboard"
                  onClick={closeMenu}
                  className="block hover:bg-blue-600 px-3 py-1 rounded transition"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="block bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block hover:bg-blue-600 px-3 py-1 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="block hover:bg-blue-600 px-3 py-1 rounded transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
