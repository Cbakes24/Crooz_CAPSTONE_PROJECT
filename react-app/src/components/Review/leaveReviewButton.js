import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LeaveReviewModal from "./leaveReviewModal";



const LeaveReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

    return (

        <OpenModalButton
        buttonText="Leave Review"
        onItemClick={closeMenu}
        modalComponent={<LeaveReviewModal />}
      />
    )
}

