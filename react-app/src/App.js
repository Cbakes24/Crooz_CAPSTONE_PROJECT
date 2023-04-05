import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import CreateVehicleForm from "./components/Vehicle/createVehicle";
import VehiclesList from "./components/Vehicle/vehiclesList";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import VehicleSearch from "./components/Booking/vehicleSearch";
import HomepageHost from "./components/HomepageHost/homepageHost";

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
          <Route exact path="/vehicles/create">
            <CreateVehicleForm />
          </Route>
          <Route exact path="/vehicles">
            <VehiclesList />
          </Route>
          <Route exact path="/bookings/search">
            <VehicleSearch />
          </Route>
          <Route exact path="/users/host/:userId">
            <HomepageHost />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
