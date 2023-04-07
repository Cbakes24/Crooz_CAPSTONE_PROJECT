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
        <NavLink className="navbar-box" exact to="/bookings/search">
          Home
        </NavLink>
        <NavLink className="navbar-box" exact to="/vehicles/create">
          Vehicle Form
        </NavLink>
        <NavLink className="navbar-box" exact to="/signup">
          SignUp
        </NavLink>
        <NavLink className="navbar-box" exact to="/users/host">
          My Page
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
