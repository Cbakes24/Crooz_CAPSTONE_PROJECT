import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";
import { editReview } from "../../store/review";
import "./review.css"

const LeaveReviewModal = ({bookingId, vehicleId, review}) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(1);
  const currentUser = useSelector((state) => state.session.user);
  const user_id = currentUser.id
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      setTimeout(() => closeModal(), 1500);
      setMessage("Review submitted successfully!");
      setIsSubmitted(true);
    }
  };
  const handleRating = (e) => {
    const newRating = parseInt(e.target.value);
    setRating(newRating);

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
            type="range"
            value={rating}
            min={1}
            max={10}
            onChange={handleRating}
            required
           />
        </label>
        <span>{rating}</span>
        <div>
            <button type="submit">Submit Review</button>
        </div>
      </form>
      {isSubmitted && <p className="review-success-message">{message}</p>}
    </div>
  );
};

export default LeaveReviewModal
