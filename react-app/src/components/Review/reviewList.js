import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchReviews } from "../../store/review";
import ReviewListItem from "./reviewListItem"

const ReviewList = ({vehicle}) => {
const dispatch = useDispatch();
const reviews = useSelector((state) => Object.values(state.review))
console.log(reviews, 'REVIEWSSSSSSS')
const filteredReviews = reviews.filter((review) => review.vehicleId === vehicle.id)


useEffect(() => {
    dispatch(fetchReviews());
}, [dispatch])

    return (
        <div>
            <h3>Vehicle Reviews</h3>
            {filteredReviews.map((review) => (
                <ReviewListItem review={review}/>
            ))}
        </div>
    )
}

export default ReviewList
