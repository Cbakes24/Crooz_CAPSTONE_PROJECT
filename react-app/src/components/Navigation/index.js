import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <li>
        <NavLink className="navbar-box" exact to="/">
          Home
        </NavLink>
        <NavLink className="navbar-box" exact to="/vehicles/create">
          Vehicle Form
        </NavLink>
        <NavLink className="navbar-box" exact to="/vehicles">
          All Vehicles
        </NavLink>
        <NavLink className="navbar-box" exact to="/signup">
          SignUp
        </NavLink>
        <NavLink className="navbar-box" exact to="/bookings/search">
          Booking
        </NavLink>
        <NavLink className="navbar-box" exact to="/users/host">
          Host Home
        </NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
