import { useState } from "react";
import axios from "axios";

const RateForm = ({ storeId, onRated }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:3000/stores/${storeId}/rate`,
        {
          rating,
          comment,
        },
        { withCredentials: true }
      );
      onRated(); // refresh the page or state
    } catch (err) {
      console.error("Rating error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-2">
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        className="border px-2 py-1 rounded w-full"
      >
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment (optional)"
        className="border px-2 py-1 rounded w-full"
        rows="3"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
        Submit
      </button>
    </form>
  );
};

export default RateForm; 