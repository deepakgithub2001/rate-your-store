import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const { name, email, address, password, password_confirmation } = formData;

    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 and 60 characters";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email format";
    }

    if (address.length > 400) {
      return "Address must be less than 400 characters";
    }

    if (
      password.length < 8 ||
      password.length > 16 ||
      !/[A-Z]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return "Password must be 8-16 characters and include at least one uppercase and one special character";
    }

    if (password !== password_confirmation) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("/users", {
        user: formData,
      });

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Signup failed. Email may already be taken.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded shadow-md w-full max-w-md mt-12 md:mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              className="w-full border px-3 py-2 rounded"
              value={formData.address}
              onChange={handleChange}
              maxLength={400}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border px-3 py-2 rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password Confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              className="w-full border px-3 py-2 rounded"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
