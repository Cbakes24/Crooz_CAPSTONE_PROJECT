/*
homepage host will contain
-list of your bookings
-list of your vehicles
-your name and picture
*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchBookings } from '../../store/booking';
import { fetchHostVehicles } from '../../store/vehicle';
import VehicleListItem from '../Vehicle/vehicleItem';

const HomepageHost = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const vehicles = useSelector( state => Object.values(state.vehicle))
    console.log(vehicles, "HOST VEHICLES")

    useEffect(() => {
        dispatch(fetchHostVehicles());
      }, [dispatch]);
    return (

        <div>
            <div>
                <h1>{currentUser.username}</h1>
            </div>
            <div>
                <h3>Your Vehicles</h3>
            {vehicles.map(vehicle => (
                    <VehicleListItem vehicle={vehicle} key={vehicle.id} />
                ))}
            </div>
            <div>
                <h3>Your Bookings</h3>
            
            </div>

        </div>
    )
}

export default HomepageHost
