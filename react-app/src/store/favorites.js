const SET_FAVORITE = "FAVORITE/SET_FAVORITE";
const REMOVE_FAVORITE = "FAVORITE/REMOVE_FAVORITE";

export const setFavorites = (favorites) => {
  return {
    type: SET_FAVORITE,
    favorites,
  };
};

// GET ALL Host FAVORITES
export const getUserFavorites= () => async (dispatch) => {
  const res = await fetch("/api/favorites", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setFavorites(data));
  }
  return data;
};


export const addToFavorites = (vehicleId) => async (dispatch) => {
console.log(vehicleId, "VEHICLE IDDDDDD!!!!!")
  const res = await fetch(`/api/favorites/${vehicleId}`, {
    method: "POST",
    body: JSON.stringify(vehicleId),
    headers: {
      "Content-Type": "application/json",
    },
  });
console.log(res, "RESSSS IN FAV THUNK")
  const data = await res.json();
  if (res.ok) {
    dispatch(setFavorites([data]));
  }
  return data;
};

const favoritesReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_FAVORITE:
      const favoritesObj = {};
      action.favorites.forEach((favorite) => {
        favoritesObj[favorite.id] = favorite;
      });
      newState = { ...newState, ...favoritesObj };
      return newState;

    case REMOVE_FAVORITE:
      delete newState[action.favoriteId];
      return newState;
    default:
      return state;
  }
};

export default favoritesReducer
