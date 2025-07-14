// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Called after login
  const login = (userData) => {
    setUser(userData);
  };

  // Called on logout
  const logout = async () => {
    try {
      await api.delete("/users/sign_out", { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/current_user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          // 401 means "Not logged in" — this is expected on first visit
          console.log("User not logged in yet");
        } else {
          console.error("Error fetching current user:", err);
        }
        setUser(null); // Set to null for safety
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext); 