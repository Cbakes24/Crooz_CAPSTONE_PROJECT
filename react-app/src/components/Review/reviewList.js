import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchReviews } from "../../store/review";
import ReviewListItem from "./reviewListItem";
import './review.css'

const ReviewList = ({ vehicle }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.review));
  const filteredReviews = reviews.filter(
    (review) => review.vehicleId === vehicle.id
  );

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className='review-list'>
      <h3>Vehicle Reviews</h3>
      {filteredReviews.map((review) => (
        <ReviewListItem review={review} key={review.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default ReviewList;
