const SET_REVIEW = "review/SET_REVIEW";
const REMOVE_REVIEW = "review/REMOVE_REVIEW";

export const setReview = (bookings) => {
  return {
    type: SET_REVIEW,
    bookings,
  };
};

export const removeReview= (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
};
