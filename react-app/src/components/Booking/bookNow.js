import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createBooking } from "../../store/booking";
import { useHistory } from 'react-router-dom';

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
        console.log(pickupDate, "BOOKNOW PPICKUP DAYTTEEE");
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
        console.log(payload, "PAYLOADDD")
        const data = await dispatch(createBooking(payload));
        if (data.errors) {
          setErrors(data.errors);
        } else {
            //maybe just push to the users guest profile page
          history.push(`/users/guest`)
        }
      };

    return (

<button onClick={handleBooking}>Book Now</button>

    )
}

export default BookNow




// const BookNow = (props) => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.session.user);
//   const history = useHistory();

//   const pickupDate = props.pickupDate;
//   const dropOffDate = props.dropOffDate;
//   const vehicleId = props.vehicle.id;
//   const address = props.address;
//   const city = props.city;
//   const state = props.state;
//   const country = props.country;

//   const [errors, setErrors] = useState([]);

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     setErrors([]);
//     console.log(pickupDate, "BOOKNOW PPICKUP DAYTTEEE");
//     const payload = {
//       pickupDate,
//       dropOffDate,
//       vehicleId,
//       address,
//       city,
//       state,
//       country,
//       currentUser,
//     };
//     console.log(payload, "PAYLOADDD")
//     const data = await dispatch(createBooking(payload));
//     if (data.errors) {
//       setErrors(data.errors);
//     } else {
//         //maybe just push to the users guest profile page
//       history.pushState(`/bookings/${data.id}`);
//     }
//   };
// console.log(typeof pickupDate, "PICKU DATEEEEEE")
// console.log(typeof dropOffDate, "DROPOFF DATEEEEEE")
//   return (
//   )
// };

// export default BookNow;
