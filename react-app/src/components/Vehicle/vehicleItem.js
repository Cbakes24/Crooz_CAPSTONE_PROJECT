import "./vehicle.css";
import { Link } from "react-router-dom";

const VehicleListItem = (props) => {
  const { vehicle, pickupDate, dropOffDate } = props;

  // Check if the vehicle is available during the selected period
  const isVehicleAvailable = vehicle.bookings.every((booking) => {
    const bookingStart = new Date(booking.pickupDate);
    console.log(bookingStart, 'VEHICLE BOOKING START')
    const bookingEnd = new Date(booking.dropOffDate);
    console.log(bookingEnd, 'VEHICLE BOOKING END')
    const start = new Date(pickupDate);
    const end = new Date(dropOffDate);
    return start >= bookingEnd || end <= bookingStart;
  });

  console.log((props.pickupDate), "Pick UP Date");
  console.log(props.vehicle, "LIST ITEM VEHICLE");
  console.log(props.vehicle.bookings, "LIST ITEM BOOKINGS");

  const handleBooking = async (e) => {
    e.preventDefault();
    if (isVehicleAvailable) {
      console.log("CREATE BOOKING THUNK");
    } else {
      alert("The vehicle is not available during the selected period");
    }
  };

  return (
    <div className="vehicle-item-box">
      <div>
        <img className="vehicle-item-image" src={props.vehicle.picture}></img>
      </div>

      <div className="vehicle-info">
        <div className="vehicle-name">
          {props.vehicle.year} {props.vehicle.make} {props.vehicle.model}
        </div>
        <div>${props.vehicle.dailyPrice}/day</div>
        <button onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
};

export default VehicleListItem;
