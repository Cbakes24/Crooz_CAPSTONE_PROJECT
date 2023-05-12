import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../store/vehicle";
import { NavLink } from "react-router-dom";
import VehicleListItem from "./vehicleItem";
import "./vehicle.css";



const VehiclesFavList = ({ location }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));
  // console.log(vehicles, 'VEHICLES!!')

  useEffect(() => {
    dispatch(fetchFavVehicles());
  }, [dispatch]);

  return (
    <div>
      <h1>You Favorite Vehicles</h1>

      <div>
        {vehicles.map((vehicle) => (
          <VehicleListItem vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>
    </div>
  );
};

export default VehiclesFavList;
