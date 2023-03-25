import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchVehiclesByLocation } from "../../store/vehicle";
// import "./booking.css";
import VehiclesList from "../Vehicle/vehiclesList";

const BookingForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));

  // console.log(vehicles.host, "VEHICLE HOST");
  const [pickupDate, setPickupDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      pickupDate,
      dropOffDate,
      location,
    };

    const data = await dispatch(fetchVehiclesByLocation(payload));
    console.log(location, 'LOCATION')
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/vehicles`);
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          pickupDate
          <input
            type="date"
            placeholder=""
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </label>
        <label>
          dropOffDate
          <input
            type="date"
            placeholder=""
            required
            value={dropOffDate}
            onChange={(e) => setDropOffDate(e.target.value)}
          />
        </label>
        <label>
          location
          <input
            type="text"
            placeholder=""
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <button>Search Cars</button>
      </form>
      <div>
        <VehiclesList location={location} />
      </div>
    </div>
  );
};

export default BookingForm;
