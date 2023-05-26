import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { HeartIcon } from '@heroicons/react/24/solid'
import { addToFavorites } from "../../store/favorites";
import { removeFromFavorites } from "../../store/favorites";
import "./favorites.css"


const FavoriteButton = ({vehicle}) => {
  const dispatch = useDispatch()
  const [isFilled, setIsFilled] = useState(false);
  const [errors, setErrors] = useState([]);


  const handleFavorite = async (e) => {
    e.preventDefault();
    setErrors([])
    setIsFilled(!isFilled)
    console.log(vehicle, 'FAV VEHICLE')
    
    const vehicleId = vehicle.id

    if( isFilled === false) {
      const data = await dispatch(addToFavorites(vehicleId));
      if (data.errors) {
        setErrors(data.errors);
      } else {
        //maybe just push to the users guest profile page
        // history.push(`/users/guest`)
      }
      
      
    } else {
      setIsFilled(!isFilled)
      const data = await dispatch(removeFromFavorites(vehicleId));
      if (data.errors) {
        setErrors(data.errors);
      } else {
        return
      }
    }
    
  }
  
  console.log("IS FILLD", isFilled)
  return (
    
    <div onClick={handleFavorite} className='heart'>
{ isFilled ?  <HeartIcon className="HeartIconSolid" /> : <HeartIcon className="HeartIconOutline" />}
  
  </div>

  )
};

export default FavoriteButton;
