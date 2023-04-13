import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { fetchBookings } from "../../store/booking";
const ReviewListItem = ({review, vehicle}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch, ]);
  //figure out username need to get a state to get the user
  /*booking.guest.id === revier.userId filter then use that username
  */
    return (
        <div>
          {review.username}
           {review.rating}
          <p>{review.body}</p>
        </div>

    )
}

export default ReviewListItem
