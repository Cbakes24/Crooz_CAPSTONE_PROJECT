import './vehicle.css'
import { Link } from 'react-router-dom'

const VehicleListItem = ({vehicle}) => {




console.log(vehicle, "LIST ITEM VEHICLE")

    return (

<div className='vehicle-item-box'>

    <div>
        <img className='vehicle-item-image' src={vehicle.picture}></img></div>

        <div className='vehicle-info'>
    <div className='vehicle-name'>{vehicle.year} {vehicle.make} {vehicle.model}
    </div>
    <div>${vehicle.dailyPrice}/day</div>
<button>Book Now</button>
        </div>



</div>
    )
}

export default VehicleListItem
