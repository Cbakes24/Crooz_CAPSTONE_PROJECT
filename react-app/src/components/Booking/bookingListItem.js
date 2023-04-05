// import "./booking.css";
import { Link } from "react-router-dom";
import BookNow from "../Booking/bookNow";

const BookingListItem = ({booking}) => {





  return (
    <div className="booking-item-box">
      <div>
        <img className="booking-item-image" src={booking.vehicle.picture}></img>
      </div>

      <div className="booking-info">
        <div className="booking-name">
        {booking.location} {booking.pickupDate} {booking.dropOffDate} {booking.vehicleId}
        </div>
        <div>{booking.guest.username}</div>

      </div>
    </div>
  );
};

export default BookingListItem;
