import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import CreateVehicleForm from "./components/Vehicle/createVehicle";
import VehiclesList from "./components/Vehicle/vehiclesList";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import VehicleSearch from "./components/Booking/vehicleSearch";
import HomepageHost from "./components/Homepage/homepageHost";
import VehicleProfile from "./components/Vehicle/vehicleProfile";
import VehicleEdit from "./components/Vehicle/VehicleEdit";
import BookingEdit from "./components/Booking/EditBooking";
import HomepageGuest from "./components/Homepage/homepageGuest";
import HomeMap from "./components/GoogleMaps/googleMapSetup";
import Home from "./components/GoogleMaps/GoogleMaps";
import EditReviewButton from "./components/Review/EditReviewModal";
import MyPage from "./components/Homepage/MyPage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setRole] = useState(false);

  const toggleRole = () => {
    setRole(!role);
    console.log(role, "**** ROLE *****")
  };

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/vehicles/create">
            <CreateVehicleForm />
          </Route>
          <Route exact path="/vehicles">
            <VehiclesList />
          </Route>
          <Route exact path="/bookings/search">
            <VehicleSearch />
          </Route>
          <Route exact path="/">
            <VehicleSearch />
          </Route>
          <Route exact path="/users/host">
            <HomepageHost />
          </Route>
          <Route exact path="/users/guest">
            <HomepageGuest />
          </Route>
          <Route exact path="/vehicles/:vehicleId">
            <VehicleProfile />
          </Route>
          <Route exact path="/vehicles/:vehicleId/edit">
            <VehicleEdit />
          </Route>
          <Route exact path="/bookings/:bookingId/edit">
            <BookingEdit />
          </Route>
          <Route exact path="/bookings/map">
            <Home />
          </Route>
          <Route exact path="/reviews/:reviewId/edit">
            <EditReviewButton />
          </Route>
          <Route exact path="/users/mypage">
            <MyPage toggleRole={toggleRole} role={role} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
