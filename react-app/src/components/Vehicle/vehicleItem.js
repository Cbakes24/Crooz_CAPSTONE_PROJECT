import "./vehicle.css";
import { Link, useHistory } from 'react-router-dom';
import BookNow from "../Booking/bookNow";
import { useSelector, useDispatch } from "react-redux";
import { deleteVehicle } from "../../store/vehicle";


const VehicleListItem = (props) => {
const currentUser = useSelector((state) => state.session.user);
const dispatch = useDispatch();
const history = useHistory

const handleDelete = async e => {
  e.preventDefault();
  if (!window.confirm('Do you want to delete this vehicle?')) return;
  await dispatch(deleteVehicle(props.vehicle.id));
  history.push('/vehicles');
};

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

        <div>
         {currentUser && currentUser.id === props.vehicle.host.id ? (
           <button onClick={handleDelete}>Delete</button>) : null }
        </div>
      </div>
    </div>
  );
};

export default VehicleListItem;
