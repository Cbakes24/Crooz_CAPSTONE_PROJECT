import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createVehicle, editVehicle } from "../../store/vehicle";
import "./vehicle.css";

const BookingForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));

  console.log(vehicles.host, "VEHILCE HOST");
  const [pickupDate, setPickupDate] = useState(vehicle.pickupDate);
  const [dropOffDate, setDropOffDate] = useState(vehicle.dropOffDate);
  const [location, setLocation] = useState(vehicle.location);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      pickupDate,
      dropOffDate,
      location,
    };

    const action = booking.id ? editBooking : createBooking;
    const data = await dispatch(action(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/bookings/${data.id}`);
    }
  };

  return (
    <div>
      <h2>Vehicle Form</h2>
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Make
          <input
            type="text"
            placeholder=""
            required
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </label>
        <label>
          Model
          <input
            type="text"
            placeholder=""
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label>
          Year
          <input
            type="number"
            placeholder=""
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <label>
          Type
          <input
            type="text"
            placeholder=""
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>

        <label>
          Power
          <input
            type="text"
            placeholder=""
            required
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </label>
        <label>
          Passengers
          <input
            type="number"
            placeholder=""
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
        </label>
        <label>
          Picture
          <input
            type="text"
            placeholder=""
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </label>
        <label>
          Daily Price
          <input
            type="number"
            placeholder=""
            value={dailyPrice}
            onChange={(e) => setDailyPrice(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button>Search Cars</button>
      </form>
    </div>
  );
};

export default VehicleForm;
