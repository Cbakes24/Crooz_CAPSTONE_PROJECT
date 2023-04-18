import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { fetchBookings } from "../../store/booking";


const ReviewListItem = ({review, vehicle}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user);


  // useEffect(() => {
  //   dispatch(fetchBookings());
  // }, [dispatch, ]);

    return (
        <div className='review-list-item'>
         <p> {review.username} </p>
           <p>{review.rating}<i className="fas fa-star"></i></p>
          <p>{review.body}</p>
        </div>

    )
}

export default ReviewListItem
