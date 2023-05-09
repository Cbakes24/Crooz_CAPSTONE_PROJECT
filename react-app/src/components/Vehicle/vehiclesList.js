import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../../store/vehicle';
import { NavLink } from 'react-router-dom';
import VehicleListItem from './vehicleItem';
import './vehicle.css';

import Home from '../GoogleMaps/GoogleMaps';


const VehiclesList = ({location}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const vehicles = useSelector( state => Object.values(state.vehicle))
    // console.log(vehicles, 'VEHICLES!!')

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch])

    return (
        <div>
            <h1>Vehicles</h1>
     
            <div className='add-vehicle-button'>
            {currentUser && (
              <NavLink to='/vehicles/create'>
                <button className='add-vehicle-button'>Add Vehicle</button>
              </NavLink>
            )}

            </div>
            <div>
                {vehicles.map(vehicle => (
                    <VehicleListItem vehicle={vehicle} key={vehicle.id} />
                ))}
            </div>
        </div>
    )
}

export default VehiclesList
