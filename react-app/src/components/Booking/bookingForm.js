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
  console.log(vehicles, "VEHICLES IN COMP")
  console.log(vehicles.host, "VEHICLE HOST");
  const [pickupDate, setPickupDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      pickupDate,
      dropOffDate,
      address,
      city,
      state,
      country
    };

    const data = await dispatch(fetchVehiclesByLocation(payload));
    console.log(data, "DATA FROM THE THUNNKKKK")
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
          Address
          <input
            type="text"
            placeholder=""
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder=""
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            placeholder=""
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label>
          Country
          <input
            type="text"
            placeholder=""
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <button>Search Cars</button>
      </form>
      <div>
        <VehiclesList city={city} />
      </div>
    </div>
  );
};

export default BookingForm;
