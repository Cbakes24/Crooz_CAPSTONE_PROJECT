import React from "react";
import OpenModalButton from "../OpenModalButton";
import LeaveReviewModal from "./LeaveReviewModal";

const LeaveReviewButton = ({bookingId, vehicleId}) => {

  return (
    <>

      <OpenModalButton
        buttonText="Leave Review"
        modalComponent={<LeaveReviewModal bookingId={bookingId} vehicleId={vehicleId} />}
      />
    </>
  );
};

export default LeaveReviewButton;
