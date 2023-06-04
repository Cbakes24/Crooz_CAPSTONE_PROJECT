import "./favorites.css";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteButton from "../Favorites/FavoriteButton";
import { getUserFavorites } from "../../store/favorites";

const FavoritesListItem = (props) => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const vehicle = props.vehicle;

  useEffect(() => {
    dispatch(getUserFavorites(currentUser.id));
  }, [dispatch, currentUser.id, currentUser.favVehicles]);

  const userFavorited =
    vehicle.favByUser &&
    vehicle.favByUser.filter((user) => {
      return user.id === currentUser.id;
    });

  return userFavorited && userFavorited.length > 0 ? (
    <div className="favorite-item-box">
      <div className="favorite-item-inner">
        <Link to={`/vehicles/${vehicle.id}`}>
          <div>
            <img className="favorite-item-image" src={vehicle.picture}></img>
          </div>
        </Link>

        <div className="favorite-info">
          <div className="favorite-name">
            <h4>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h4>
            <div>
              {currentUser && currentUser.id === vehicle.host ? null : (
                <div className="favorite-buttons">
                  <FavoriteButton className="HeartIcon" vehicle={vehicle} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default FavoritesListItem;
