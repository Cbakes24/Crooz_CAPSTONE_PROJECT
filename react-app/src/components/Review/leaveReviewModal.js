import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/review";

const LeaveReviewModal = ({bookingId, vehicleId}) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const user_id = currentUser.id
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      body,
      rating,
      vehicle_id: vehicleId,
      booking_id: bookingId,
      user_id
    }


    // console.log(payload, "REVIEWWWW SUBMIT")
    const data = await dispatch(createReview(payload));
    if (data.errors) {
      setErrors(data.errors);
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
            value={rating}
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
