import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";
import { editReview } from "../../store/review";
import "./review.css"

const LeaveReviewModal = ({bookingId, vehicleId, review}) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const user_id = currentUser.id
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...review,
      body,
      rating,
      vehicle_id: vehicleId,
      booking_id: bookingId,
      user_id
    }


    const action = review?.id ? editReview : createReview;
    const data = await dispatch(action(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setTimeout(() => closeModal(), 1000);
      setMessage("Review submitted successfully!");;
    }
  };

  return (
    <div className="review-form-box">
      <h1 className="review-title">Leave a Review!</h1>

      <form onSubmit={handleSubmit} className="review-form">
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
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
           />
        </label>
        <div>
            <button type="submit">Submit Review</button>
        </div>
      <p>{message}</p>
      </form>
    </div>
  );
};

export default LeaveReviewModal
