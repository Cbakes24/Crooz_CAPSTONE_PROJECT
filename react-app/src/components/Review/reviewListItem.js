import { useSelector, useDispatch } from "react-redux";
import {  useHistory } from "react-router-dom";
import { deleteReview } from "../../store/review";
import EditReviewButton from "./EditReviewButton";

const ReviewListItem = ({ review, vehicle }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

 
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Do you want to delete this review?")) return;
    await dispatch(deleteReview(review.id));
  };

  return (
    <div className="review-list-item">
      <p> {review.username} </p>
      <p>
        {review.rating}
        <i className="fas fa-star"></i>
      </p>
      <p>{review.body}</p>

      {currentUser && currentUser.id === review.userId ? (
        <div>
          <EditReviewButton review={review} />
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewListItem;
