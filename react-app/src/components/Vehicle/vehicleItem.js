import './vehicle.css'
import { Link } from 'react-router-dom'

const VehicleListItem = (props) => {



console.log(props.pickupDate, "Pick UP Date")
console.log(props.vehicle, "LIST ITEM VEHICLE")


const handleBooking = async e => {
    e.preventDefault();
    
}

    return (

<div className='vehicle-item-box'>

    <div>
        <img className='vehicle-item-image' src={props.vehicle.picture}></img></div>

        <div className='vehicle-info'>
    <div className='vehicle-name'>{props.vehicle.year} {props.vehicle.make} {props.vehicle.model}
    </div>
    <div>${props.vehicle.dailyPrice}/day</div>
<button onClick={handleBooking}>Book Now</button>
        </div>



</div>
    )
}

export default VehicleListItem
