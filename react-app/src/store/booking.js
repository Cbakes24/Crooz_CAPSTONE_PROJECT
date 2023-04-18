const SET_BOOKING = "booking/SET_BOOKING";
const REMOVE_BOOKING = "booking/REMOVE_BOOKING";

export const setBookings = (bookings) => {
  return {
    type: SET_BOOKING,
    bookings,
  };
};

export const removeBooking = (bookingId) => {
  return {
    type: REMOVE_BOOKING,
    bookingId,
  };
};

// GET ALL bookingS
export const fetchBookings = () => async (dispatch) => {
  const res = await fetch("/api/bookings", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setBookings(data));
  }
  return data;
};

// GET ALL Host bookingS
export const fetchHostBookings = () => async (dispatch) => {
  const res = await fetch("/api/bookings/host", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setBookings(data));
  }
  return data;
};
// GET ALL Guest bookingS
export const fetchGuestBookings = () => async (dispatch) => {
  const res = await fetch("/api/bookings/guest", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setBookings(data));
  }
  return data;
};

// GET a booking by id
export const fetchBooking = (bookingId) => async (dispatch) => {
  const res = await fetch(`/api/bookings/${bookingId}`);

  const data = await res.json();
  if (res.ok) {
    dispatch(setBookings([data]));
  }
  return data;
};

// POST create a booking
export const createBooking = (booking) => async (dispatch) => {
  const res = await fetch("/api/bookings/create", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setBookings([data]));
  }
  return data;
};

//   PUT edit a booking
export const editBooking = (booking) => async (dispatch) => {
  // console.log(booking, "BOOKING IN VEHICLE EDIT THUNK")
  const res = await fetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  // console.log(data, "DATA EDIT BOOKING THUNK")
  if (res.ok) {
    dispatch(setBookings([data]));
  }
  return data;
};

//DELETE a booking
export const deleteBooking = (bookingId) => async (dispatch) => {
  const res = await fetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeBooking(bookingId));
  }
  return res;
};

const bookingsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_BOOKING:
      const bookingsObj = {};
      action.bookings.forEach((booking) => {
        bookingsObj[booking.id] = booking;
      });
      newState = { ...newState, ...bookingsObj };
      return newState;

    case REMOVE_BOOKING:
      delete newState[action.bookingId];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
