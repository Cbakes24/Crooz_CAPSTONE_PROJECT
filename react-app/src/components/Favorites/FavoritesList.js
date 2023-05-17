import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../store/vehicle";
import { NavLink } from "react-router-dom";
import VehicleListItem from "../Vehicle/vehicleItem";
import { getUserFavorites } from "../../store/favorites";




const FavoritesList= ({ location }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const vehicles = useSelector((state) => Object.values(state.vehicle));
  const favoritesObj = useSelector((state) => Object.values(state.favorites))
  console.log(favoritesObj, 'VEHICLES!!')

  useEffect(() => {
    dispatch(getUserFavorites());
  }, [dispatch]);

  return (
    <div>
      <h1>You Favorite Vehicles</h1>

      <div>
        {favoritesObj.map((vehicle) => (
          <VehicleListItem vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>


    </div>
  );
};

export default FavoritesList;
