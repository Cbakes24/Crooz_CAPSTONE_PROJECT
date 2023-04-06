import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchVehicle } from '../../store/vehicle';

const VehicleProfile = (props) => {
const dispatch = useDispatch()
const history = useHistory()
const [pickupDate, setPickupDate] = useState("");
const [dropOffDate, setDropOffDate] = useState("");
const { vehicleId } = useParams()
const vehicle = useSelector(state => state.vehicle[vehicleId])
//if vehicle is undefined on a page refresh redirect to vehicle search?
console.log(vehicle, "SELECTED VEHICLE")
    return (
        <div>
        <h1>Vehicle Profile</h1>
        <div>
            <img src={vehicle.picture} />
        </div>
        <div>
            <section>

        <h3>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
        <p>{vehicle.description}</p>
        <ul>
            <li>
            Passengers {vehicle.passengers}
            </li>
            <li>Power: {vehicle.power}</li>
            <li>Type: {vehicle.type}</li>
            <li>Price: ${vehicle.dailyPrice}/day</li>
            <li>Located: {vehicle.userCity}</li>

        </ul>
            </section>
        </div>
        <div>Host: {vehicle.host.username} Email: {vehicle.host.email}</div>

        <label>
          pickupDate
          <input
            type="datetime-local"
            placeholder=""
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </label>
        <label>
          dropOffDate
          <input
            type="datetime-local"
            placeholder=""
            required
            value={dropOffDate}
            onChange={(e) => setDropOffDate(e.target.value)}
          />
        </label>
        </div>
    )
}

export default VehicleProfile
