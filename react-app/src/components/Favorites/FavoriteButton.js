import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { HeartIcon } from '@heroicons/react/24/solid'
import { addToFavorites } from "../../store/favorites";

const FavoriteButton = ({vehicle}) => {
  const [favorite, setFavorite] = useState("false");
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);


  const handleFavorite = async (e) => {
    e.preventDefault();
    setErrors([])
    console.log(vehicle, 'FAV VEHICLE')
    setFavorite("true")

    const vehicleId = vehicle.id

    const data = await dispatch(addToFavorites(vehicleId));
    if (data.errors) {
      setErrors(data.errors);
    } else {
        //maybe just push to the users guest profile page
      // history.push(`/users/guest`)
    }

  }

  return (

  <div onClick={handleFavorite}>
   <HeartIcon className="HeartIcon" />
  </div>

  )
};

export default FavoriteButton;
