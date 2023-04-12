import { useSelector, useDispatch } from "react-redux";

const ReviewListItem = ({review}) => {
    const currentUser = useSelector((state) => state.session.user);
  //figure out username need to get a state to get the user
  //booking.guest.id === revier.userId filter then use that username
    return (
        <div>
           {review.rating}
          <p>{review.body}</p>
        </div>

    )
}

export default ReviewListItem
