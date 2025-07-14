// src/pages/SystemAdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_stores: 0,
    total_ratings: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard", { withCredentials: true });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
        navigate("/login");
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">System Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow rounded p-6">
            <p className="text-2xl font-semibold">{stats.total_users}</p>
            <p className="text-gray-500">Total Users</p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <p className="text-2xl font-semibold">{stats.total_stores}</p>
            <p className="text-gray-500">Total Stores</p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <p className="text-2xl font-semibold">{stats.total_ratings}</p>
            <p className="text-gray-500">Total Ratings</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
