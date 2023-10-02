import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createBooking } from "../../store/booking";
import { useHistory } from "react-router-dom";

const BookNow = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const pickupDate = props.pickupDate;
  const dropOffDate = props.dropOffDate;
  const vehicleId = props.vehicle.id;
  const address = props.address;
  const city = props.city;
  const state = props.state;
  const country = props.country;
  const [errors, setErrors] = useState([]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      pickupDate,
      dropOffDate,
      vehicleId,
      address,
      city,
      state,
      country,
      currentUser,
    };

    const data = await dispatch(createBooking(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/bookings/payments`);
    }
  };

  return <button onClick={handleBooking}>Book Now</button>;
};

export default BookNow;
