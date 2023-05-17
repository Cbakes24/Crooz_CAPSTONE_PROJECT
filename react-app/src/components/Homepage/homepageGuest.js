import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostVehicles } from "../../store/vehicle";
import VehicleListItem from "../Vehicle/vehicleItem";
import BookingListItem from "../Booking/bookingListItem";
import CreateVehicleForm from "../Vehicle/createVehicle";
import { fetchHostBookings, fetchGuestBookings } from "../../store/booking";
import { useHistory, Redirect } from "react-router-dom";
import FavoritesList from "../Favorites/FavoritesList";


const HomepageGuest = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));
  const bookings = useSelector((state) => Object.values(state.booking));

  // const hostBookings = bookings.filter((booking) => booking.host.id === sessionUser.id);
  // const hostVehicles = vehicles.filter((vehicle) => vehicle.host.id === sessionUser.id);
  const today = new Date()




  useEffect(() => {
    // dispatch(fetchHostVehicles());
    // dispatch(fetchHostBookings());
    dispatch(fetchGuestBookings());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/login" />;
  const guestBookings = bookings.filter((booking) => booking.guest.id === sessionUser.id).reverse()
  const previousTrips = guestBookings.filter((booking) => new Date(booking.dropOffDate) < today)
  const upcomingTrips = guestBookings.filter((booking) => new Date(booking.dropOffDate) >= today)


  return (
    <div>

      <div>
        <h1>{sessionUser.username}'s Trips!</h1>
      </div>

            <div class='personal-trips'>
                <h3>Your Upcoming Trips</h3>
                {upcomingTrips.map((booking) => (
                <BookingListItem booking={booking} key={booking.id} />
                ))}
            </div>

            <div class='personal-trips'>
                <h3>Your Previous Trips</h3>
                {previousTrips.map((booking) => (
                <BookingListItem booking={booking} key={booking.id} />
                ))}
            </div>

            <div>
              <FavoritesList />
            </div>
    </div>
  );
};

export default HomepageGuest;
