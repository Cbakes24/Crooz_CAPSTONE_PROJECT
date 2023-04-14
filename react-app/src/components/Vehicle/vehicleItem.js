import "./vehicle.css";
import { Link, useHistory } from 'react-router-dom';
import BookNow from "../Booking/bookNow";
import { useSelector, useDispatch } from "react-redux";
import { deleteVehicle } from "../../store/vehicle";


const VehicleListItem = (props) => {
const currentUser = useSelector((state) => state.session.user);
const dispatch = useDispatch();
const history = useHistory();
const vehicle = props.vehicle
const handleDelete = async e => {
  e.preventDefault();
  if (!window.confirm('Do you want to delete this vehicle?')) return;
  await dispatch(deleteVehicle(vehicle.id));
  history.push('/vehicles');
};

const handleEdit = async e => {
  e.preventDefault();
  if (currentUser.id === vehicle.host.id) {
    history.push(`/vehicles/${vehicle.id}/edit`);
  }
  return null
};

  return (
    <div className="vehicle-item-box">

<Link to={`/vehicles/${vehicle.id}?pickupDate=${props.pickupDate}&dropOffDate=${props.dropOffDate}`} >
      <div>
        <img className="vehicle-item-image" src={vehicle.picture}></img>
      </div>

      
        </Link>

      <div className="vehicle-info">
        <div className="vehicle-name">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </div>
        <div>${vehicle.dailyPrice}/day</div>
        {currentUser && currentUser.id === vehicle.host.id ? null : (
          <BookNow
            pickupDate={props.pickupDate}
            dropOffDate={props.dropOffDate}
            vehicle={vehicle}
            address={props.address}
            city={props.city}
            state={props.state}
            country={props.country}
          />
        )}

        <div>
         {currentUser && currentUser.id === vehicle.host.id ? (
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
            </div>
           ) : null }
        </div>
      </div>
    </div>
  );
};

export default VehicleListItem;
