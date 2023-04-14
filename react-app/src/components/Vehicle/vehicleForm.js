import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createVehicle, editVehicle } from "../../store/vehicle";
import "./vehicle.css";

const VehicleForm = ({ vehicle }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [make, setMake] = useState(vehicle.make);
  const [model, setModel] = useState(vehicle.model);
  const [year, setYear] = useState(vehicle.year);
  const [type, setType] = useState(vehicle.type);
  const [power, setPower] = useState(vehicle.power);
  const [passengers, setPassengers] = useState(vehicle.passengers);
  const [picture, setPicture] = useState(vehicle.picture);
  const [description, setDescription] = useState(vehicle.description);
  const [dailyPrice, setDailyPrice] = useState(vehicle.dailyPrice);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...vehicle,
      make,
      model,
      year,
      type,
      power,
      passengers,
      picture,
      daily_price: dailyPrice,
      description,
    };

    const action = vehicle.id ? editVehicle : createVehicle;
    const data = await dispatch(action(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/vehicles/${data.id}`);
    }
  };

  return (
    <div>

      <form className="vehicle-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Make
          <input
            type="text"
            placeholder=""
            required
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </label>
        <label>
          Model
          <input
            type="text"
            placeholder=""
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label>
          Year
          <input
            type="number"
            placeholder=""
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <label>
          Type
          <input
            type="text"
            placeholder=""
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>

        <label>
          Power
          <input
            type="text"
            placeholder=""
            required
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </label>
        <label>
          Passengers
          <input
            type="number"
            placeholder=""
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
        </label>
        <label>
          Picture
          <input
            type="text"
            placeholder=""
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </label>
        <label>
          Daily Price
          <input
            type="number"
            placeholder=""
            value={dailyPrice}
            onChange={(e) => setDailyPrice(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {/* <select onChange={e => setBreweryId(e.target.value)}>
          <option value={-0}>Select Brewery</option>
          {breweries.map(({ id, name }, idx) =>
            beer.id && beer.brewery && id === beer.brewery.id ? (
              <option key={idx} defaultValue={id} selected>
                {name}
              </option>
            ) : (
              <option key={idx} value={id}>
                {name}
              </option>
            )
          )}
        </select> */}
        <button>{vehicle.id ? "update" : "create"}</button>
      </form>
    </div>
  );
};

export default VehicleForm;
