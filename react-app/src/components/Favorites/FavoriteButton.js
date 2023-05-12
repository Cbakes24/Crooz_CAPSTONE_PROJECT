import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const FavoriteButton = () => {
  const [favorite, setFavorite] = useState("false");



  const handleFavorite = () => {
    e.preventDefault();
    setFavorite("true")
  }

  return <button onClick={handleFavorite}>Some heart ICon</button>;
};

export default FavoriteButton;
