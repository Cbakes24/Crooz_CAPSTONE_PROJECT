import React, { useState } from "react";
import { NavLink, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import HomepageGuest from "../Homepage/homepageGuest";

function Navigation({ isLoaded }) {
  const currentUser = useSelector((state) => state.session.user);
  const [toggleRole, setToggleRole] = useState(false);

  const handleRole = () => {
    setToggleRole(!toggleRole);
  };

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
                <ProfileButton user={currentUser} />
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
              <NavLink className="navbar-box" exact to="/users/mypage">
                MyPage
              </NavLink>
            </button>

           
          </div>
        </ul>
      </header>
    </>
  );
}

export default Navigation;
