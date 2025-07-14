import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, setUser } = useAuth(); // ✅ added setUser

  useEffect(() => {
    // Optional: force logout when visiting login page
    api.delete("/users/sign_out", { withCredentials: true }).catch(() => {});
    setUser(null); // ✅ logout user in context
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await api.post(
        "/users/sign_in",
        { user: { email, password } },
        { withCredentials: true }
      );

      const user = response.data.user;

      if (!user || !user.role) {
        setError("Invalid user role returned from server");
        return;
      }

      login(user); // ✅ save user in context

      // ✅ redirect based on role
      if (user.role === "system_admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "store_owner") {
        navigate("/store-owner/dashboard");
      } else if (user.role === "normal_user") {
        navigate("/user/dashboard");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-5 md:my-16">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
