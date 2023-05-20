import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon1 } from "@heroicons/react/24/outline"
import { addToFavorites } from "../../store/favorites";

const FavoriteButton = ({vehicle}) => {
  const dispatch = useDispatch()
  const [isFilled, setIsFilled] = useState(false);
  const [errors, setErrors] = useState([]);


  const handleFavorite = async (e) => {
    e.preventDefault();
    setErrors([])
    setIsFilled(!'isFilled')
    console.log(vehicle, 'FAV VEHICLE')
  

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

  <div onClick={handleFavorite} className='heart'>
{ isFilled ?  <HeartIcon className="HeartIconSolid" /> : <HeartIcon className="HeartIconOutline" />}
  
  </div>

  )
};

export default FavoriteButton;
