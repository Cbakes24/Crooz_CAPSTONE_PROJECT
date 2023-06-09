import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchVehiclesByLocation } from "../../store/vehicle";
import "./booking.css";
import VehicleListItem from "../Vehicle/vehicleItem";
import Home from "../GoogleMaps/GoogleMaps";

const VehicleSearch = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [pickupDate, setPickupDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);
  const [locationVehicles, setLocationVehicles] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);


  const today = new Date();
  const cities = ['Boston', 'San Diego', 'Phoenix']


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      pickupDate,
      dropOffDate,
      address,
      city,
      state,
      country,
    };

    setSearchPerformed(true);

    var now = new Date();
    var minimumPickupTime = new Date(now.getTime() - (59 * 60 * 1000)); // Adding 1 hour to the current time
    
    if (pickupDate > dropOffDate) {
      alert("The Pick Up Date must be before the Drop Off Date");
      return false;
    } else if (new Date(pickupDate) < minimumPickupTime || new Date(dropOffDate) < minimumPickupTime) {
      alert("The earliest pick up date must be at least 1 hour in advance");
      return false;
    }

    const data = await dispatch(fetchVehiclesByLocation(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      const filterVehicles = data.vehicles.filter((vehicle) => {
        // Check if the vehicle is available during the selected period using every means that every booking a vehicle has must be true to be available if one is false then the car is not available

        const isVehicleAvailable = vehicle.bookings.every((booking) => {
          const bookingStart = new Date(booking.pickupDate);
          // console.log(bookingStart, "VEHICLE BOOKING START");
          const bookingEnd = new Date(booking.dropOffDate);
          // console.log(bookingEnd, "VEHICLE BOOKING END");
          const start = new Date(pickupDate);
          // console.log(start, "SEARCH START DATE");
          const end = new Date(dropOffDate);
          // console.log(end, "SEARCH END DATE");

          return start >= bookingEnd || end <= bookingStart;
        });

        if (!isVehicleAvailable) {
          return false;
        }
        return true;
      });

      setLocationVehicles(filterVehicles);
    }
  };

  useEffect(() => {
    if (locationVehicles.length > 0) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [locationVehicles]);

  return (
    <div className="homepage">
      <div className="homepage-title">
        <h1>Time to Find Your Ride!</h1>
      </div>

      <ul className="booking-errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-label">
          <label>Pickup Date</label>
          <input
            className="booking-input"
            type="datetime-local"
            placeholder=""
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>

        <div className="form-label" id="center-label">
          <label>Drop Off Date</label>
          <input
            className="booking-input"
            type="datetime-local"
            placeholder=""
            required
            value={dropOffDate}
            onChange={(e) => setDropOffDate(e.target.value)}
          />
        </div>
        {/* <div className="form-label">
        <label> Address</label>
          <input
          className="booking-input"
            type="text"
            placeholder=""
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div> */}

        <div className="form-label">
          <label>City</label>
          <select className='city-selector' onChange={e => setCity(e.target.value)}>
          <option value={-0}></option>
          {cities.map((city, idx) =>
            city === "" ? (
              <option key={idx} value={city} selected>
                {city}
              </option>
            ) : (
              <option key={idx} value={city}>
                {city}
              </option>
            )
          )}
        </select>
          {/* <input
            className="booking-input"
            type="text"
            placeholder=""
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          /> */}
        </div>

        {/* <label>
          State
          <input
            type="text"
            placeholder=""
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label>
          Country
          <input
            type="text"
            placeholder=""
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label> */}
        <div className="form-label-button">
          <button>Search</button>
        </div>
      </form>
      <div className="star">
        <i className="fas fa-bicycle"></i>
      </div>
      <img
        className="home-image" alt="vehicle-pic"
        src="https://images.pexels.com/photos/2454516/pexels-photo-2454516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <div className="list-map">
      { locationVehicles && locationVehicles.length > 0 ?  (

        <ul>
          {locationVehicles.map((vehicle) => (
            <VehicleListItem
              vehicle={vehicle}
              key={vehicle.id}
              pickupDate={pickupDate}
              dropOffDate={dropOffDate}
              address={address}
              city={city}
              state={state}
              country={country}
              currentUser={currentUser}
            />
          ))}
        </ul>

      ) : ( searchPerformed && <h2>No available vehicles</h2>)}
        {showMap && <Home city={city} locationVehicles={locationVehicles} />}
      </div>
    </div>
  );
};

export default VehicleSearch;
