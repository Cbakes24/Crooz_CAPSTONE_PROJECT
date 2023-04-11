/*
homepage host will contain
-list of your bookings
-list of your vehicles
-your name and picture
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostVehicles } from "../../store/vehicle";
import VehicleListItem from "../Vehicle/vehicleItem";
import BookingListItem from "../Booking/bookingListItem";
import CreateVehicleForm from "../Vehicle/createVehicle";
import { fetchHostBookings, fetchGuestBookings } from "../../store/booking";
import { useHistory } from "react-router-dom";


const HomepageHost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));
  const bookings = useSelector((state) => Object.values(state.booking));
  const guestBookings = bookings.filter((booking) => booking.guest.id === currentUser.id);
  const hostBookings = bookings.filter((booking) => booking.host.id === currentUser.id);
  const hostVehicles = vehicles.filter((vehicle) => vehicle.host.id === currentUser.id);
  console.log(guestBookings, " Guest BOOOKING TRIPSSS")

  useEffect(() => {
    dispatch(fetchHostVehicles());
    dispatch(fetchHostBookings());
    dispatch(fetchGuestBookings());
  }, [dispatch]);



  if (!currentUser) {
    return (
      <div>
        <h1>Please log in</h1>
        <button onClick={() => history.push("/login")}>Log in</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>{currentUser.username}</h1>
      </div>

            <div>
                <h3>Your Vehicles</h3>
                {hostVehicles.map((vehicle) => (
                <VehicleListItem vehicle={vehicle} key={vehicle.id} />
                ))}
            </div>

            <div>
                <h3>Your Hosted Trips</h3>
                {hostBookings.map((booking) => (
                <BookingListItem booking={booking} key={booking.id} />
                ))}
            </div>

            <div>
                <h3>Your Personal Trips</h3>
                {guestBookings.map((booking) => (
                <BookingListItem booking={booking} key={booking.id} />
                ))}
            </div>
            <div>
                <h3>Add a Vehicle</h3>
                <CreateVehicleForm />
            </div>
    </div>
  );
};

export default HomepageHost;
