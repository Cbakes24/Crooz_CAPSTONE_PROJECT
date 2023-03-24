const SET_VEHICLES = "vehicles/SET_VEHICLES";
const REMOVE_VEHICLES = "vehicles/REMOVE_VEHICLES";

export const setVehicles = (vehicles) => {
  return {
    type: SET_VEHICLES,
    vehicles,
  };
};

export const removeVehicle = (vehicleId) => {
  return {
    type: REMOVE_VEHICLES,
    vehicleId,
  };
};

// GET ALL VEHICLES
export const fetchVehicles = () => async (dispatch) => {
  const res = await fetch("/api/vehicles", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setVehicles(data));
  }
  return data;
};

// GET ALL VEHICLES BY DATE and LOCATION
export const fetchVehiclesByLocation = (payload) => async (dispatch) => {
  const res = await fetch("/api/vehicles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setVehicles(data));
  }
  return data;
};

// GET a vehicle by id
export const fetchVehicle = (vehicleId) => async (dispatch) => {
  const res = await fetch(`/api/vehicles/${vehicleId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setVehicles([data]));
  }
  return data;
};

// GET a vehicle by type
export const fetchVehicleType = (vehicleType) => async (dispatch) => {
  const res = await fetch(`/api/vehicles/${vehicleType}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setVehicles([data]));
  }
  return data;
};

// POST create a vehicle
export const createVehicle = (vehicle) => async (dispatch) => {
  const res = await fetch("/api/vehicles", {
    method: "POST",
    body: JSON.stringify(vehicle),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setVehicles([data]));
  }
  return data;
};

//   PUT edit a vehicle
export const editVehicle = (vehicle) => async (dispatch) => {
  const res = await fetch(`/api/vehicles/${vehicle.id}`, {
    method: "PUT",
    body: JSON.stringify(vehicle),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setVehicles([data]));
  }
  return data;
};

//DELETE a vehicle
export const deleteVehicle = (vehicleId) => async (dispatch) => {
  const res = await fetch(`/api/vehicles/${vehicleId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeVehicle(vehicleId));
  }
  return res;
};


const vehiclesReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
      case SET_VEHICLES:
        const vehiclesObj = {};
        action.vehicles.forEach(vehicle => {
          vehiclesObj[vehicle.id] = vehicle;
        });
        newState = { ...newState, ...vehiclesObj };
        return newState;


      case REMOVE_VEHICLES:
        delete newState[action.vehicleId];
        return newState;
      default:
        return state;
    }
  };

  export default vehiclesReducer;
