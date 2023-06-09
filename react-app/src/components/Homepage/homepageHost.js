import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostVehicles } from "../../store/vehicle";
import VehicleListItem from "../Vehicle/vehicleItem";
import BookingListItem from "../Booking/bookingListItem";
import CreateVehicleForm from "../Vehicle/createVehicle";
import { fetchHostBookings } from "../../store/booking";
import { useHistory, Redirect } from "react-router-dom";


const HomepageHost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));
  const bookings = useSelector((state) => Object.values(state.booking));

  useEffect(() => {
    dispatch(fetchHostVehicles());
    dispatch(fetchHostBookings());
    // dispatch(fetchGuestBookings());
  }, [dispatch]);


  if (!currentUser) return <Redirect to="/login" />;
  // const guestBookings = bookings.filter((booking) => booking.guest.id === currentUser.id).reverse();
  const hostBookings = bookings.filter((booking) => booking.host.id === currentUser.id).reverse();
  const hostVehicles = vehicles.filter((vehicle) => vehicle.host.id === currentUser.id);



  return (
    <div>

      <div>
        <h1>{currentUser.username}'s Host Page</h1>
      </div>

            <div class='my-vehicles'>
                <h3>Your Vehicles</h3>
                {hostVehicles.map((vehicle) => (
                <VehicleListItem vehicle={vehicle} key={vehicle.id} />
                ))}
            </div>
            <div class='hosted-trips'>
                <h3>Your Hosted Trips</h3>
                {hostBookings.map((booking) => (
                <BookingListItem booking={booking} key={booking.id} />
                ))}
            </div>
            {/* <div class='personal-trips'>
                <h3>Your Personal Trips</h3>
                {guestBookings.map((booking) => (
                <BookingListItem booking={booking} key={booking.id} />
                ))}
            </div> */}
            <div class='vehicle-form'>
                <h3>Add a Vehicle</h3>
                <CreateVehicleForm />
            </div>

    </div>
  );
};

export default HomepageHost;
