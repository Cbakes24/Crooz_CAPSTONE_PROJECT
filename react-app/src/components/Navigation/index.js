import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <header>
        <div className="mylinks">
          <a href="https://github.com/Cbakes24/Crooz_CAPSTONE_PROJECT">
            <button>
              GitHub <i class="fa-brands fa-github"></i>
            </button>
          </a>
          <br></br>

          <a href="https://www.linkedin.com/in/cory-baker-9738ba2a/">
            <button>
              LinkedIn <i class="fa-brands fa-linkedin"></i>
            </button>
          </a>
        </div>
        <ul>
          <div className="navbar">
            {isLoaded && (
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            )}
            <button>
              <NavLink className="navbar-box" exact to="/bookings/search">
                Home
              </NavLink>
            </button>
            <button>
              <NavLink className="navbar-box" exact to="/vehicles/create">
                Vehicle Form
              </NavLink>
            </button>
            <button>
              <NavLink className="navbar-box" exact to="/signup">
                SignUp
              </NavLink>
            </button>
            <button>
              <NavLink className="navbar-box" exact to="/users/host">
                Host Page
              </NavLink>
            </button>
            <button>
              <NavLink className="navbar-box" exact to="/users/guest">
                Guest Page
              </NavLink>
            </button>
          </div>
        </ul>
      </header>
    </>
  );
}

export default Navigation;
