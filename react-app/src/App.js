import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import CreateVehicleForm from "./components/Vehicle/createVehicle";
import VehiclesList from "./components/Vehicle/vehiclesList";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import BookingForm from "./components/Booking/bookingForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/vehicles/create">
            <CreateVehicleForm />
          </Route>
          <Route path="/vehicles">
            <VehiclesList />
          </Route>
          <Route path="/bookings/search">
            <BookingForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
