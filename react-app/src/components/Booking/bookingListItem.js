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

  console.log(typeof booking.pickupDate, "TYPE OFFFFF");
  const pickupDateObj = new Date(booking.pickupDate);
  const dropOffDateObj = new Date(booking.dropOffDate);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const pickupDate = pickupDateObj.toLocaleDateString("en-US", options);
  const dropOffDate = dropOffDateObj.toLocaleDateString("en-US", options);

  console.log(pickupDate, "FORMATED DATE");

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Do you want to delete this booking?")) return;
    await dispatch(deleteBooking(booking.id));
    history.push("/users/host");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (currentUser.id === booking.guest.id) {
      history.push(`/bookings/${booking.id}/edit`);
    }
    return null;
  };

  return (
    <div className="booking-item-box">
      <Link to={`/vehicles/${booking.vehicle.id}`}>
        <img className="booking-item-image" src={booking.vehicle.picture}></img>
      </Link>

      <div className="booking-item">
        <div className="booking-info">
          <div className="booking-name">
            <h5>
              {booking.vehicle.make} {booking.vehicle.model}
            </h5>
            <ul>
              <li>City: {booking.city}</li>
              <li>
                Dates: {pickupDate} - {dropOffDate}
              </li>
              <li>Guest: {booking.guest.username}</li>
            </ul>
            <ul>
              <li>Trip Length {booking.tripLength} days</li>
              <li>Total Price ${booking.totalPrice}.00</li>
            </ul>
          </div>
          <div className="booking-buttons">
            {booking.pickupDate && today < new Date(booking.pickupDate) ? (
              <div>
                <button onClick={handleDelete}>Cancel Trip</button>
                <button onClick={handleEdit}>Edit</button>
              </div>
            ) : null}

            {booking.dropOffDate &&
            new Date(booking.dropOffDate) < new Date() ? (
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
        </div>
      </div>
    </div>
  );
};

export default BookingListItem;
