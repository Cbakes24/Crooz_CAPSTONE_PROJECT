import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { HeartIcon } from '@heroicons/react/24/solid'


const FavoriteButton = ({vehicle}) => {
  const [favorite, setFavorite] = useState("false");


  const handleFavorite = (e) => {
    e.preventDefault();
    console.log(vehicle, 'FAV VEHICLE')
    setFavorite("true")
  }

  return (

  <div onClick={handleFavorite}>
   <HeartIcon className="HeartIcon" />
  </div>

  )
};

export default FavoriteButton;
