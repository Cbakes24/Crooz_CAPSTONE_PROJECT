import LeaveReviewButton from "../Review/leaveReviewButton";
import { useSelector } from "react-redux";
import "./booking.css";
import { Link } from "react-router-dom";
const BookingListItem = ({ booking }) => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="booking-item-box">
      <div>
        <h3>
          {booking.vehicle.make} {booking.vehicle.model}
        </h3>
        <Link to={`/vehicles/${booking.vehicle.id}`}>View Car</Link>
        <img className="booking-item-image" src={booking.vehicle.picture}></img>
      </div>

      <div className="booking-info">
        <div className="booking-name">
          {booking.location} {booking.pickupDate} {booking.dropOffDate}{" "}
          {booking.vehicleId}
        </div>
        <div>{booking.guest.username}</div>
        {currentUser && currentUser.id === booking.guest.id ? (
          <div>
            <LeaveReviewButton
              bookingId={booking.id}
              vehicleId={booking.vehicleId}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BookingListItem;
