import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListItem from "../Booking/bookingListItem";
import { fetchGuestBookings } from "../../store/booking";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import FavoritesList from "../Favorites/FavoritesList";
import "./hompage.css";
import HomepageGuest from "./homepageGuest";

const MyPage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const [toggleRole, setToggleRole] = useState(false);

  const handleRole = () => {
    setToggleRole(!toggleRole);
  };

  return (
  <div>

{toggleRole ? (
              <button>
            <HomepageGuest />
              </button>
            ) : (
              <button>
                <NavLink
                  onClick={handleRole}
                  className="navbar-box"
                  exact
                  to="/users/host"
                >
                  Switch To Host
                </NavLink>
              </button>
            )}
  </div>
  );
};

export default MyPage
