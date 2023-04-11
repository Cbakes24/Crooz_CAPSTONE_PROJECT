import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";

const LeaveReviewModal = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createReview(body, rating));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div>
      <h1>Leave a Review!</h1>

      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Review
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>

        <label>
          Rating
          <input
            type="number"
            step="1"
            value={body}
            onChange={(e) => setRating(e.target.value)}
            required
           />
        </label>
        <div>
            <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveReviewModal
