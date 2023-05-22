import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { fetchBookings } from "../../store/booking";
import { Link, useHistory } from "react-router-dom";
import { deleteReview } from "../../store/review";
const ReviewListItem = ({review, vehicle}) => {
    const dispatch = useDispatch()
    
    const currentUser = useSelector((state) => state.session.user);

    const handleDelete = async (e) => {
      e.preventDefault();
      if (!window.confirm("Do you want to delete this review?")) return;
      await dispatch(deleteReview(review.id));
    };


    return (
        <div className='review-list-item'>
         <p> {review.username} </p>
           <p>{review.rating}<i className="fas fa-star"></i></p>
          <p>{review.body}</p>

          <button>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>

    )
}

export default ReviewListItem
