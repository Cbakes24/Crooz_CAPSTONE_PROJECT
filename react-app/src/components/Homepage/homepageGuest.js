import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListItem from "../Booking/bookingListItem";
import { fetchGuestBookings } from "../../store/booking";
import { useHistory, Redirect } from "react-router-dom";
import FavoritesList from "../Favorites/FavoritesList";
import "./hompage.css";

const HomepageGuest = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));
  const bookings = useSelector((state) => Object.values(state.booking));
  
  console.log()
  // const hostBookings = bookings.filter((booking) => booking.host.id === currentUser.id);
  // const hostVehicles = vehicles.filter((vehicle) => vehicle.host.id === currentUser.id);
  const today = new Date();

  useEffect(() => {
    // dispatch(fetchHostVehicles());
    dispatch(fetchGuestBookings());
  }, [dispatch]);

  if (!currentUser) return <Redirect to="/login" />;
  const guestBookings = bookings
    .filter((booking) => booking.guest.id === currentUser.id)
    .reverse();
  const previousTrips = guestBookings.filter(
    (booking) => new Date(booking.dropOffDate) < today
  );
  const upcomingTrips = guestBookings.filter(
    (booking) => new Date(booking.dropOffDate) >= today
  );

  return (
    <div className="guest-page-trips">
      <div className="personal-trips">
        <div>
          <h1>{currentUser.username}'s Trips!</h1>
        </div>
        <div>
          <h3>Your Upcoming Trips</h3>
          <div className="upcoming-trips">
            {upcomingTrips.map((booking) => (
              <BookingListItem booking={booking} key={booking.id} />
            ))}
          </div>
        </div>
        <div>
          <h3>Your Previous Trips</h3>
          <div className="previous-trips">
            {previousTrips.map((booking) => (
              <BookingListItem booking={booking} key={booking.id} />
            ))}
          </div>
        </div>
      </div>

      <div className="favorites-section">
        <div>
          <h1>Favorites!</h1>
        </div>
        <div className="favorites-list">
          <FavoritesList />
        </div>
      </div>
    </div>
  );
};

export default HomepageGuest;
