import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import { fetchVehicle } from "../../store/vehicle";
import BookNow from "../Booking/bookNow";
import { deleteVehicle } from "../../store/vehicle";
import ReviewList from "../Review/reviewList";
import { fetchReviews } from "../../store/review";

const VehicleProfile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const urlPickupDate = new URLSearchParams(location.search).get("pickupDate");
  const urlDropOffDate = new URLSearchParams(location.search).get(
    "dropOffDate"
  );
  const [pickupDate, setPickupDate] = useState(urlPickupDate || "");
  const [dropOffDate, setDropOffDate] = useState(urlDropOffDate || "");
  const today = new Date();
  const { vehicleId } = useParams();
  const vehicleState = useSelector((state) => state.vehicle);
  const vehicle = vehicleState[vehicleId];
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchVehicle(vehicleId));
    dispatch(fetchReviews());
  }, [dispatch, vehicleId]);

  const isVehicleAvailable = (pickupDate, dropOffDate) => {
    if (!pickupDate || !dropOffDate) {
      return false;
    }
    return vehicle.bookings.every((booking) => {
      const bookingStart = new Date(booking.pickupDate);
      const bookingEnd = new Date(booking.dropOffDate);
      const start = new Date(pickupDate);
      const end = new Date(dropOffDate);

      if (pickupDate > dropOffDate) {
        alert("The Pick Up Date must be before the Drop Off Date");
        return false;
      } else if (
        new Date(pickupDate) < today ||
        new Date(dropOffDate) < today
      ) {
        alert("Dates cannot be a previous date");
        return false;
      }

      return start >= bookingEnd || end <= bookingStart;
    });
  };

  useEffect(() => {
    const available = isVehicleAvailable(pickupDate, dropOffDate);
    setVehicleAvailable(available);
  }, [pickupDate, dropOffDate, vehicle]);

  const [vehicleAvailable, setVehicleAvailable] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Do you want to delete this vehicle?")) return;
    await dispatch(deleteVehicle(vehicle.id));
    history.push("/vehicles");
  };

  return vehicle ? (
    <div className="vehicle-profile">
      <div className='profile-title'>

      <h1>Vehicle Profile</h1>
      <div className='profile-picture'>
        <img src={vehicle.picture} />
      </div>


      </div>
      <div>
        <div className="vehicle-profile-info">
          <div className="description">
          <h2>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h2>

          <div id="description" >
            <h3>Description</h3>
            <p>{vehicle.description}</p>
          </div>
          <div>
        <ReviewList vehicle={vehicle} />
      </div>

          </div>


          {/* <div className="divider"></div> */}
          {currentUser && currentUser.id === vehicle.host.id ? null : (
            <div className="availability">
              <div className="profile-info">
              <h4>Check Availability: </h4>

              <div className="update">
              <label>
                Pick Up:{"  "}
                </label>
                <input
                  type="datetime-local"
                  placeholder={urlPickupDate}
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              <label>
                Drop Off:{"  "}
                </label>
                <input
                  type="datetime-local"
                  placeholder=""
                  required
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                />
</div>
              <div>
                {vehicleAvailable && (
                  <BookNow
                    pickupDate={pickupDate}
                    dropOffDate={dropOffDate}
                    vehicle={vehicle}
                    address={vehicle.host.address}
                    city={vehicle.host.city}
                    state={vehicle.host.state}
                    country={vehicle.host.country}
                  />
                )}
              </div>

          <div className="vehicle-profile-stats">
            <h3>Vehicle Information</h3>
            <p>Passengers {vehicle.passengers}</p>
            <p>Power: {vehicle.power}</p>
            <p>Type: {vehicle.type}</p>
            <p>Price: ${vehicle.dailyPrice}/day</p>
            <p>Located: {vehicle.city}</p>

          <div className="host-info">
            <h3>Host Info</h3>
           <p>Host: {vehicle.host.username}</p>
           <p>Email: {vehicle.host.email}</p>
          </div>

          </div>


                </div>
            </div>
          )}

          {/* <div className="divider"></div> */}

        </div>
      </div>
      <div className="divider"></div>


      <div>
        {currentUser && currentUser.id === vehicle.host.id ? (
          <button onClick={handleDelete}>Delete</button>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default VehicleProfile;

//   useEffect(() => {
//     dispatch(fetchVehicle(vehicleId));
//   }, [dispatch, vehicleId]);
