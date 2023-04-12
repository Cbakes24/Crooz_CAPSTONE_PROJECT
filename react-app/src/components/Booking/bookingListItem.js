
import LeaveReviewButton from '../Review/leaveReviewButton';
import './booking.css';
const BookingListItem = ({booking}) => {





  return (
    <div className="booking-item-box">
      <div>
        <h3>{booking.vehicle.make} {booking.vehicle.model}</h3>
        <img className="booking-item-image" src={booking.vehicle.picture}></img>
      </div>

      <div className="booking-info">
        <div className="booking-name">
        {booking.location} {booking.pickupDate} {booking.dropOffDate} {booking.vehicleId}
        </div>
        <div>{booking.guest.username}</div>
    <div>
      <LeaveReviewButton  bookingId={booking.id} vehicleId={booking.vehicleId}/>
    </div>
      </div>
    </div>
  );
};

export default BookingListItem;
