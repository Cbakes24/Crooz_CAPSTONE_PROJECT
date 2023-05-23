import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeaveReviewModal from "./leaveReviewModal";
import { fetchReviews } from "../../store/review";


const ReviewEdit = ({review}) => {
const dispatch = useDispatch()

useEffect(() => {
    dispatch(fetchReviews(review.id));
},[dispatch, review.id]);

if(!review) {
    return null;
}

return <LeaveReviewModal review={review} />
};
