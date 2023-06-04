import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookingForm from "./bookingForm";
import { fetchBooking } from "../../store/booking";

const BookingEdit = () => {
  const { bookingId } = useParams();
  const bookingsObj = useSelector((state) => state.booking);
  const booking = bookingsObj[bookingId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooking(bookingId));
  }, [dispatch]);

  if (!booking) {
    return null;
  }

  return (
    <div className="booking-form-edit">
      <BookingForm booking={booking} />;
    </div>
  );
};

export default BookingEdit;
