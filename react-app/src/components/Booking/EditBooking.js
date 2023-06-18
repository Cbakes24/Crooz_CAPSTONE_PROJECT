import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookingForm from "./bookingForm";
import { fetchBooking } from "../../store/booking";

const BookingEdit = () => {
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const bookingsObj = useSelector((state) => state.booking);
  const booking = bookingsObj[bookingId];


  useEffect(() => {
    console.log("HELLO IN THE")
    dispatch(fetchBooking(bookingId));
  }, [dispatch]);

  if (!booking) {
    return null;
  }

  return booking ? ( 
    <div className="booking-form-edit">
      <BookingForm booking={booking} />;
    </div>
  ) : (null);
};

export default BookingEdit;
