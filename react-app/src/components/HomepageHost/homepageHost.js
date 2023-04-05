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
import BookingsList from '../Booking/bookingsList';
import VehiclesList from '../Vehicle/vehiclesList';

const HomepageHost = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const vehicles = useSelector( state => Object.values(state.vehicle))
    console.log(vehicles)
    return (

        <div>
            <div>
                <h1>{currentUser.username}</h1>
            </div>
            <div>

            <VehiclesList />
            </div>
            <div>
            <BookingsList />
            </div>

        </div>
    )
}

export default HomepageHost
