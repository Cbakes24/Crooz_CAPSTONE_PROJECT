import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoritesListItem from "./FavoritesListItem";
import { getUserFavorites } from "../../store/favorites";

const FavoritesList = ({ location }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const favoritesObj = useSelector((state) => Object.values(state.favorites));

  useEffect(() => {
    dispatch(getUserFavorites(currentUser.id));
  }, [dispatch, currentUser.id, currentUser.favVehicles]);

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
