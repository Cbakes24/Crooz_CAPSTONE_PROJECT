import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostVehicles } from "../../store/vehicle";
import VehicleListItem from "../Vehicle/vehicleItem";
import BookingListItem from "../Booking/bookingListItem";
import CreateVehicleForm from "../Vehicle/createVehicle";
import { fetchHostBookings, fetchGuestBookings } from "../../store/booking";
import { useHistory, Redirect } from "react-router-dom";


const HomepageGuest = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));
  const bookings = useSelector((state) => Object.values(state.booking));
  const guestBookings = bookings.filter((booking) => booking.guest.id === currentUser.id).reverse();
  const hostBookings = bookings.filter((booking) => booking.host.id === currentUser.id);
  const hostVehicles = vehicles.filter((vehicle) => vehicle.host.id === currentUser.id);
  const today = new Date()
  const previousTrips = guestBookings.filter((booking) => new Date(booking.dropOffDate) < today)
  const upcomingTrips = guestBookings.filter((booking) => new Date(booking.dropOffDate) >= today)

  useEffect(() => {
    dispatch(fetchHostVehicles());
    dispatch(fetchHostBookings());
    dispatch(fetchGuestBookings());
  }, [dispatch]);


  if (!currentUser) return <Redirect to="/login" />;

  return (
    <div>

      <div>
        <h1>{currentUser.username}'s Trips!</h1>
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
    </div>
  );
};

export default HomepageGuest;
