import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center shadow fixed w-full top-0 z-50">
      {/* Left Side - Logo */}
      <Link to="/" className="no-underline">
        <h1 className="text-2xl font-bold flex items-center">
          RateYourStore <FaShoppingCart className="text-3xl" />
        </h1>
      </Link>

      {/* Right Side - Navigation */}
      <div className="space-x-3 font-semibold flex items-center">
        <Link
          to="/about"
          className="hover:bg-blue-600 px-3 py-1 rounded transition"
        >
          About
        </Link>

        {user ? (
          <>
            {/* Role-based dashboard links */}
            {user.role === "system_admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="hover:bg-blue-600 px-3 py-1 rounded transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="hover:bg-blue-600 px-3 py-1 rounded transition"
                >
                  Manage Users
                </Link>
                <Link
                  to="/admin/ratings"
                  className="hover:bg-blue-600 px-3 py-1 rounded transition"
                >
                  Manage Ratings
                </Link>
              </>
            )}
            {user.role === "store_owner" && (
              <Link
                to="/store-owner/dashboard"
                className="hover:bg-blue-600 px-3 py-1 rounded transition"
              >
                Dashboard
              </Link>
            )}
            {user.role === "normal_user" && (
              <Link
                to="/user/dashboard"
                className="hover:bg-blue-600 px-3 py-1 rounded transition"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:bg-blue-600 px-3 py-1 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:bg-blue-600 px-3 py-1 rounded transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
