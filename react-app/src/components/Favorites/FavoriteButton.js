import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/solid";
import { addToFavorites } from "../../store/favorites";
import { removeFromFavorites } from "../../store/favorites";
import "./favorites.css";

const FavoriteButton = ({ vehicle }) => {
  const dispatch = useDispatch();
  const [isFilled, setIsFilled] = useState(false);
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector((state) => state.session.user);

  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    if (favorites[vehicle.id]) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [dispatch, vehicle, favorites]);

  const handleFavorite = async (e) => {
    e.preventDefault();

    setErrors([]);

    const vehicleId = vehicle.id;

    if (isFilled === false) {
      setIsFilled(true);
      const data = await dispatch(addToFavorites(vehicleId));
      if (data.errors) {
        setErrors(data.errors);
      } else {
        return;
      }
    } else {
      setIsFilled(!isFilled);
      const data = await dispatch(removeFromFavorites(vehicleId));
      if (data.errors) {
        setErrors(data.errors);
      } else {
        return;
      }
    }
  };

  return (
    <div onClick={handleFavorite} className="heart">
      {isFilled ? (
        <HeartIcon className="HeartIconSolid" />
      ) : (
        <HeartIcon className="HeartIconOutline" />
      )}
    </div>
  );
};

export default FavoriteButton;
