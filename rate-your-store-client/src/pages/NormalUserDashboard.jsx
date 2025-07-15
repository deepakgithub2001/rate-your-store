import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NormalUserDashboard() {
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({}); // storeId => rating
  const [comments, setComments] = useState({}); // storeId => comment
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get("/stores", { withCredentials: true });
        setStores(res.data);
      } catch (err) {
        console.error("Error fetching stores:", err);
      }
    };

    fetchStores();
  }, []);

  const handleRatingChange = (storeId, value) => {
    setRatings((prev) => ({ ...prev, [storeId]: value }));
  };

  const handleCommentChange = (storeId, value) => {
    setComments((prev) => ({ ...prev, [storeId]: value }));
  };

  const submitRating = async (storeId) => {
    const ratingValue = ratings[storeId];
    const comment = comments[storeId] || "";

    if (!ratingValue) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      await api.post(
        `/stores/${storeId}/ratings`,
        {
          rating: {
            rating: ratingValue,
            comment: comment,
          },
        },
        { withCredentials: true }
      );

      setMessage("Rating submitted!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Rating submission failed:", err);
      alert("Rating submission failed.");
    }
  };

  const renderStars = (count, interactive = false, onClick = () => {}) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl cursor-${interactive ? "pointer" : "default"} ${
          i < count ? "text-yellow-500" : "text-gray-300"
        }`}
        onClick={() => interactive && onClick(i + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Stores</h1>
        {message && (
          <p className="text-green-600 font-semibold text-center mb-4">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-md rounded-xl p-5 transition hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-1">{store.name}</h2>
              <p className="text-gray-600 mb-1">{store.address}</p>
              <p className="text-sm text-gray-500 mb-3">{store.description}</p>

              <div className="mb-2">
                <strong>Average Rating:</strong>{" "}
                {store.average_rating !== null
                  ? renderStars(Math.round(store.average_rating))
                  : "Not rated yet"}
              </div>

              <div className="flex items-center space-x-1 mb-2">
                <strong>Your Rating:</strong>
                {renderStars(
                  ratings[store.id] || store.my_rating || 0,
                  true,
                  (value) => handleRatingChange(store.id, value)
                )}
              </div>

              {/* Comment Input */}
              <textarea
                placeholder="Leave your comment..."
                className="border border-gray-300 rounded-md p-2 w-full mt-2 mb-2"
                value={comments[store.id] || ""}
                onChange={(e) => handleCommentChange(store.id, e.target.value)}
              />

              <button
                onClick={() => submitRating(store.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
