import React from "react";
import OpenModalButton from "../OpenModalButton";
import LeaveReviewModal from "./LeaveReviewModal";

const EditReviewButton = ({bookingId, vehicleId, review}) => {

  return (
    <>

      <OpenModalButton
        buttonText="Edit Review"
        modalComponent={<LeaveReviewModal bookingId={review.bookingId} vehicleId={review.vehicleId} review={review} />}
      />
    </>
  );
};

export default EditReviewButton;
