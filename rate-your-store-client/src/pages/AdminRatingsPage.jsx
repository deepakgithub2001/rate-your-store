import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

// ⭐ Utility to render rating stars
const renderStars = (score) => {
  return [...Array(5)].map((_, i) =>
    i < score ? (
      <span key={i} className="text-yellow-500 text-lg">
        ★
      </span>
    ) : (
      <span key={i} className="text-gray-300 text-lg">
        ☆
      </span>
    )
  );
};

const AdminRatingsPage = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/ratings", { withCredentials: true })
      .then((res) => setRatings(res.data))
      .catch((err) => console.error("Error fetching ratings:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-24 px-4 py-6">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Manage Store Ratings
        </h2>

        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-sm text-gray-800 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm text-gray-800 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-center font-semibold text-sm text-gray-800 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm text-gray-800 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm text-gray-800 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ratings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No ratings available.
                  </td>
                </tr>
              ) : (
                ratings.map((rating) => (
                  <tr key={rating.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{rating.store.name}</td>
                    <td className="px-6 py-4">{rating.user.name}</td>
                    <td className="px-6 py-4 text-center">
                      {renderStars(rating.rating)}
                    </td>
                    <td className="px-6 py-4">{rating.comment || "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminRatingsPage;
