import React, { useContext, useState } from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import adminImage from "../../../assets/background.jpg";
import { AppContext } from "../../../Context/AppContext.jsx";

const NavBar = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const navigate = useNavigate();
  const {isUserLogin,setIsUserLogin} = useContext(AppContext);

  const handleLogout = () => {
    // Clear token and logout
    setIsUserLogin(false)
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsShowMenu(!isShowMenu); // Toggle the menu display state
  };

  return (
    <div className="ed-admin-navbar">
      <div className="ed-admin-navbar-left">
        <span onClick={() => navigate("/")}>
          Edu - Bridge <i className="bx bx-book-reader"></i>
        </span>
      </div>
      <div className="ed-admin-navbar-right">
        {isUserLogin ? (
          <>
          <div className="ed-admin-container"  onClick={toggleMenu}>
            <img src={adminImage} className="ed-admin-image" alt="Admin" />
            <div className="ed-admin-menus-container">
              <span className="ed-admin-name">Admin</span>
              
            </div>
            
            <i class='bx bx-chevron-down' ></i>
          </div>
          <div
          className={`ed-admin-menus ${isShowMenu ? "active" : ""}`}
          >
          <h4 className="ed-admin-title">My Account</h4>
          <hr />
          <span className="ed-admin-menu">Profile</span>
          <NavLink to='/dashboard/settings/' className="ed-admin-menu">Settings</NavLink>
          <hr />
          <span onClick={handleLogout} className="ed-admin-menu">
            Logout
          </span>
        </div>
        </>
        ) : (
          <>
            <button
              className="ed-admin-navbar-right-login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="ed-admin-navbar-right-register"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
