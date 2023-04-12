import LeaveReviewButton from "../Review/leaveReviewButton";
import { useSelector, useDispatch } from "react-redux";
import "./booking.css";
import { deleteBooking } from "../../store/booking";
import { Link, useHistory } from "react-router-dom";

const BookingListItem = ({ booking }) => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const today = new Date();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Do you want to delete this booking?")) return;
    await dispatch(deleteBooking(booking.id));
    history.push("/users/host");
  };

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

        {booking.pickupDate && today < new Date(booking.pickupDate) ? (
          <div>
            <button onClick={handleDelete}>Cancel Trip</button>
          </div>
        ) : null}
      </div>

      {booking.dropOffDate && booking.dropOffDate < today ? (
        <div>
          {currentUser && currentUser.id === booking.guest.id ? (
            <div>
              <LeaveReviewButton
                bookingId={booking.id}
                vehicleId={booking.vehicleId}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default BookingListItem;
