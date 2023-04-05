/*
homepage host will contain
-list of your bookings
-list of your vehicles
-your name and picture
*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostVehicles } from '../../store/vehicle';
import VehicleListItem from '../Vehicle/vehicleItem';
import BookingListItem from '../Booking/bookingListItem';
import { fetchHostBookings } from '../../store/booking';


const HomepageHost = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const vehicles = useSelector( state => Object.values(state.vehicle))
    const bookings = useSelector( state => Object.values(state.booking))
    console.log(vehicles, "HOST VEHICLES")
    console.log(bookings, "HOST Bookings")

    useEffect(() => {
        dispatch(fetchHostVehicles());
        dispatch(fetchHostBookings());
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
                {bookings.map(booking => (

                <BookingListItem booking={booking} key={booking.id} />
                ))}
            </div>

        </div>
    )
}

export default HomepageHost
