import "./vehicle.css";
import { Link } from 'react-router-dom';
import BookNow from "../Booking/bookNow";
import { useSelector } from "react-redux";
const VehicleListItem = (props) => {

const currentUser = useSelector((state) => state.session.user);
console.log(currentUser, "CURRENT USER INFO")
console.log(props.vehicle.host.id, "HOST ID!!!!")


  return (
    <div className="vehicle-item-box">
      <Link to={`/vehicles/${props.vehicle.id}`}  >View Car</Link>
      <div>
        <img className="vehicle-item-image" src={props.vehicle.picture}></img>
      </div>

      <div className="vehicle-info">
        <div className="vehicle-name">
          {props.vehicle.year} {props.vehicle.make} {props.vehicle.model}
        </div>
        <div>${props.vehicle.dailyPrice}/day</div>
        {currentUser && currentUser.id === props.vehicle.host.id ? null : (
          <BookNow
            pickupDate={props.pickupDate}
            dropOffDate={props.dropOffDate}
            vehicle={props.vehicle}
            address={props.address}
            city={props.city}
            state={props.state}
            country={props.country}
          />
        )}
      </div>
    </div>
  );
};

export default VehicleListItem;

// import "./vehicle.css";
// import BookNow from "../Booking/bookNow";

// const VehicleListItem = (props) => {

//   return (
//     <div className="vehicle-item-box">
//       <div>
//         <img
//           className="vehicle-item-image"
//           alt=""
//           src={props.vehicle.picture}
//         ></img>
//       </div>

//       <div className="vehicle-info">
//         <div className="vehicle-name">
//           {props.vehicle.year} {props.vehicle.make} {props.vehicle.model}

//         </div>
//         <div>${props.vehicle.dailyPrice}/day</div>
//         <BookNow
          // pickupDate={props.pickupDate}
          // dropOffDate={props.dropOffDate}
          // vehicle={props.vehicle}
          // address={props.address}
          // city={props.city}
          // state={props.state}
          // country={props.country}
//         />
//       </div>
//     </div>
//   );
// };

// export default VehicleListItem;
