import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const BookNow = (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const handleBooking = async (e) => {
        e.preventDefault();
          console.log("CREATE BOOKING THUNK");
      };


    return (

<button onClick={handleBooking}>Book Now</button>

    )
}

export default BookNow
