import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VehicleListItem from "../Vehicle/vehicleItem";
import FavoritesListItem from "./FavoritesListItem";
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

      <div>
        {favoritesObj.map((vehicle) => (
          <FavoritesListItem vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>


    </div>
  );
};

export default FavoritesList;
