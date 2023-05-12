const ADD_FAVORITE = "FAVORITE/SET_FAVORITE";
const REMOVE_FAVORITE = "FAVORITE/REMOVE_FAVORITE";

export const addToFavorites = (favorite) => {
  return {
    type: ADD_FAVORITE,
    favorite,
  };
};




const favoritesReducer = (state = [], action) => {
    if (action.type === "ADD_FAVORITE") {
        return state.concat(action.favorite)
    }
    return state
}

export default favoritesReducer
