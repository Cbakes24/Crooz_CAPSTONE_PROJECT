import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { fetchBookings } from "../../store/booking";
const ReviewListItem = ({review}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user);
    const bookingState = useSelector((state) => state.booking)
    const booking = bookingState[review.bookingId]
console.log(booking, 'REVIEW BOOKINGGGG')


  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch, ]);
  //figure out username need to get a state to get the user
  /*booking.guest.id === revier.userId filter then use that username
  */
    return booking ? (
        <div>
            {booking.guest.username}
           {review.rating}
          <p>{review.body}</p>
        </div>

    ) : null
}

export default ReviewListItem
