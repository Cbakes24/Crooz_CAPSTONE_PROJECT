import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { editBooking } from "../../store/booking";
import "./booking.css";

const BookingForm = ({ booking }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const urlPickupDate = new URLSearchParams(location.search).get("pickupDate");
  const urlDropOffDate = new URLSearchParams(location.search).get(
    "dropOffDate"
  );
  const [pickupDate, setPickupDate] = useState(urlPickupDate || "");
  const [dropOffDate, setDropOffDate] = useState(urlDropOffDate || "");
  const [address, setAddress] = useState(booking.address);
  const [city, setCity] = useState(booking.city);
  const [state, setState] = useState(booking.state);
  const [country, setCountry] = useState(booking.country);
  const [vehicle, setVehicle] = useState(booking.vehicle)
  const today = new Date()
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...booking,
      pickupDate,
      dropOffDate,
      address,
      city,
      state,
      country,
    };

    const data = await dispatch(editBooking(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/users/guest`);
    }
  };
  return (
    <div className='booking-edit'>
      <img src={vehicle.picture} />
      <form className="booking-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="form-label">
          Pickup Date
          <input
          className="booking-input"
            type="datetime-local"
            placeholder={pickupDate}
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </label>
        <label className="form-label">
          Drop Off Date
          <input
          className="booking-input"
            type="datetime-local"
            placeholder={dropOffDate}
            required
            value={dropOffDate}
            onChange={(e) => setDropOffDate(e.target.value)}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default BookingForm;
