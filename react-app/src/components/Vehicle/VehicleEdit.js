import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import VehicleForm from "./vehicleForm";
import { fetchVehicle } from "../../store/vehicle";

const VehicleEdit = () => {
  const { vehicleId } = useParams();
  const vehiclesObj = useSelector((state) => state.vehicle);

  const vehicle = vehiclesObj[vehicleId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicle(vehicleId));
  }, [dispatch, vehicleId]);

  if (!vehicle) {
    return null;
  }

  return <VehicleForm vehicle={vehicle} />;
};

export default VehicleEdit;
