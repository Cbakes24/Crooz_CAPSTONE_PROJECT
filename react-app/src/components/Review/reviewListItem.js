import { useSelector, useDispatch } from "react-redux";

const ReviewListItem = ({review}) => {
    const currentUser = useSelector((state) => state.session.user);

    return (
        <div>
           {currentUser.username}
           {review.rating}
          <p>{review.body}</p>
        </div>

    )
}

export default ReviewListItem
