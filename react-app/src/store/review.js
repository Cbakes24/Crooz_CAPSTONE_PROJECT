const SET_REVIEW = "review/SET_REVIEW";
const REMOVE_REVIEW = "review/REMOVE_REVIEW";

export const setReview = (reviews) => {
  return {
    type: SET_REVIEW,
    reviews,
  };
};

export const removeReview= (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
};

// GET ALL reviews
export const fetchReviews = () => async (dispatch) => {
    const res = await fetch("/api/reviews", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(setReview(data));
    }
    return data;
  };

// CREATE REVIEW
export const createReview = (payload) => async (dispatch) => {
  // console.log(payload, 'review in thunk')
  const res = await fetch("/api/reviews/create", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

    const data = await res.json();
    // console.log(data, 'data in thunk')
  if (res.ok) {
    dispatch(setReview([data]));
  }
  return data;
}




  const reviewsReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case SET_REVIEW:
          const reviewsObj = {};
          action.reviews.forEach((review) => {
            reviewsObj[review.id] = review;
          });
          newState = { ...newState, ...reviewsObj };
          return newState;

          case REMOVE_REVIEW:
            delete newState[action.reviewId];
            return newState;
          default:
            return state;
        }
      };

      export default reviewsReducer;
