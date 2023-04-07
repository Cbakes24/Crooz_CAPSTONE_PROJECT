import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { fetchVehicle } from "../../store/vehicle";
import BookNow from "../Booking/bookNow";
import { deleteVehicle } from "../../store/vehicle";

const VehicleProfile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pickupDate, setPickupDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const today = new Date();
  const { vehicleId } = useParams();
  const vehicle = useSelector((state) => state.vehicle[vehicleId]);
  const currentUser = useSelector((state) => state.session.user);
  //if vehicle is undefined on a page refresh redirect to vehicle search?
  console.log(vehicleId, "SELECTED VEHICLE ID");

  const isVehicleAvailable = (pickupDate, dropOffDate) => {
    if (!pickupDate || !dropOffDate) {
      return false;
    }
    return vehicle.bookings.every((booking) => {
      const bookingStart = new Date(booking.pickupDate);
      const bookingEnd = new Date(booking.dropOffDate);
      const start = new Date(pickupDate);
      const end = new Date(dropOffDate);

      if (pickupDate > dropOffDate) {
        alert("The Pick Up Date must be before the Drop Off Date");
        return false;
      } else if (
        new Date(pickupDate) < today ||
        new Date(dropOffDate) < today
      ) {
        alert("Dates cannot be a previous date");
        return false;
      }

      return start >= bookingEnd || end <= bookingStart;
    });
  };

  //   useEffect(() => {
  //     dispatch(fetchVehicle(vehicleId));
  //   }, [dispatch, vehicleId]);

  useEffect(() => {
    const available = isVehicleAvailable(pickupDate, dropOffDate);
    setVehicleAvailable(available);
  }, [pickupDate, dropOffDate, vehicle]);

  const [vehicleAvailable, setVehicleAvailable] = useState(false);


  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this vehicle?')) return;
    await dispatch(deleteVehicle(vehicle.id));
    history.push('/vehicles');
  };


  return (
    <div>
      <h1>Vehicle Profile</h1>
      <div>
        <img src={vehicle.picture} />
      </div>
      <div>
        <section>
          <h3>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p>{vehicle.description}</p>
          <ul>
            <li>Passengers {vehicle.passengers}</li>
            <li>Power: {vehicle.power}</li>
            <li>Type: {vehicle.type}</li>
            <li>Price: ${vehicle.dailyPrice}/day</li>
            <li>Located: {vehicle.city}</li>
          </ul>
        </section>
      </div>
      <div>
        Host: {vehicle.host.username} Email: {vehicle.host.email}
      </div>
      {currentUser && currentUser.id === vehicle.host.id ? null : (
        <section>
          <h4>Check Availability</h4>
          <label>
            pickupDate
            <input
              type="datetime-local"
              placeholder=""
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </label>
          <label>
            dropOffDate
            <input
              type="datetime-local"
              placeholder=""
              required
              value={dropOffDate}
              onChange={(e) => setDropOffDate(e.target.value)}
            />
          </label>

          <div>
            {vehicleAvailable && (
              <BookNow
                pickupDate={pickupDate}
                dropOffDate={dropOffDate}
                vehicle={vehicle}
                address={vehicle.host.address}
                city={vehicle.host.city}
                state={vehicle.host.state}
                country={vehicle.host.country}
              />
            )}
          </div>
        </section>
      )}

      <div>
         {currentUser && currentUser.id === vehicle.host.id ? (
           <button onClick={handleDelete}>Delete</button>) : null }
        </div>

    </div>
  );
};

export default VehicleProfile;

//   useEffect(() => {
//     dispatch(fetchVehicle(vehicleId));
//   }, [dispatch, vehicleId]);
