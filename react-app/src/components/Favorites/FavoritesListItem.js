import "./favorites.css";
import { Link, useHistory } from "react-router-dom";
import BookNow from "../Booking/bookNow";
import { useSelector, useDispatch } from "react-redux";
import { deleteVehicle } from "../../store/vehicle";
import FavoriteButton from "../Favorites/FavoriteButton";

const FavoritesListItem = (props) => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const vehicle = props.vehicle;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Do you want to delete this vehicle?")) return;
    await dispatch(deleteVehicle(vehicle.id));
    history.push("/users/host");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (currentUser.id === vehicle.host.id) {
      history.push(`/vehicles/${vehicle.id}/edit`);
    }
    return null;
  };

  return (
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
              {currentUser && currentUser.id === vehicle.host.id ? null : (
                <div  className="favorite-buttons">
                  <BookNow
                    vehicle={vehicle}
                    address={vehicle.address}
                    city={props.city}
                    state={props.state}
                    country={props.country}
                  />
                  <FavoriteButton className="HeartIcon" vehicle={vehicle} />
                </div>
              )}

              <div>
                {currentUser && currentUser.id === vehicle.host.id ? (
                  <div  className="favorite-buttons">
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleEdit}>Edit</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesListItem;
