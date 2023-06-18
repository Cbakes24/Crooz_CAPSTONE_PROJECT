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
  const pickupDateObj = new Date(booking.pickupDate);
  const dropOffDateObj = new Date(booking.dropOffDate);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const pickupDate = pickupDateObj.toLocaleDateString("en-US", options);
  console.log("🚀 ~ file: bookingListItem.js:21 ~ BookingListItem ~ pickupDate:", pickupDate)
  const dropOffDate = dropOffDateObj.toLocaleDateString("en-US", options);
  console.log("🚀 ~ file: bookingListItem.js:23 ~ BookingListItem ~ dropOffDate:", dropOffDate)



  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Do you want to delete this booking?")) return;
    await dispatch(deleteBooking(booking.id));
    history.push("/users/guest");
  };

  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   if (currentUser.id === booking.guest.id) {
  //    history.push(`/bookings/${booking.id}/edit?pickupDate=${pickupDate}&dropOffDate=${dropOffDate}`)
  //   }
  //   return null;
  // };

  return (
    <div className="booking-item-box">
      <Link to={`/vehicles/${booking.vehicle.id}`}>
        <div>
        <img className="booking-item-image" src={booking.vehicle.picture}></img>

        </div>
      </Link>


        <div className="booking-info">
          <div className="booking-name">
            <h4>
              {booking.vehicle.make} {booking.vehicle.model}
            </h4>
            </div>

<div className="booking-stats">
           <p>City: {booking.city}</p>
           <p> Dates: {pickupDate} - {dropOffDate}</p>
           <p>Guest: {booking.guest.username}</p>
           <p> Trip Length: {booking.tripLength} days</p>
           <p>Total Price: ${booking.totalPrice}.00</p>

</div>


          {/* <div className="booking-buttons"> */}
          <div>
            {booking.pickupDate && today < new Date(booking.pickupDate) ? (
              <div>
                <button onClick={handleDelete}>Cancel Trip</button>
                {/* <button onClick={handleEdit}>Edit</button> */}
                <Link to={`/bookings/${booking.id}/edit?pickupDate=${pickupDate}&dropOffDate=${dropOffDate}`} >
                  <button>Edit</button>
                </Link>
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
  );
};

export default BookingListItem;
