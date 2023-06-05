import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListItem from "../Booking/bookingListItem";
import { fetchGuestBookings } from "../../store/booking";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import FavoritesList from "../Favorites/FavoritesList";
import "./hompage.css";
import HomepageGuest from "./homepageGuest";
import HomepageHost from "./homepageHost";

const MyPage = ({toggleRole, role}) => {
  const currentUser = useSelector((state) => state.session.user);


 

  return (
    <div>
    <button onClick={toggleRole} className="toggleRole">
      Switch Roles
    </button>

    { role ? (
        <HomepageGuest />
    ) : (
        <HomepageHost />
    )}

    </div>





  );
};
export default MyPage;
