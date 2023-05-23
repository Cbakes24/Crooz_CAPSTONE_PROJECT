import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LeaveReviewModal from "./leaveReviewModal";

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
