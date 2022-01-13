import React from "react";
import { useHistory } from "react-router";
import { logout } from "../helpers/auth";
import logo from "../assets/logo.svg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CreateIcon from "@mui/icons-material/Create";
import user from "../assets/user.png";
import { Button } from "@mui/material";

const Navbar = () => {
  const history = useHistory();
  const redirect = () => {
    history.push("/app");
  };
  return (
    <div className="nav-wrapper">
      <button
        onClick={
          () => {
            logout(() => {
              history.push("/login");
            })
          }
        }
      >
        Logout
      </button>
      <div className="home-logo-wrapper">
        <img src={logo} alt="logo" onClick={redirect} className="logo" />
      </div>
      <div className="accessibility-wrapper">
        <a href="/app/explore">
          <PersonAddIcon className="access-item" />
        </a>
        <a href="/">
          <NotificationsOutlinedIcon className="access-item" />
        </a>
        <a href="/app/write">
          <CreateIcon className="access-item" />
        </a>
        <img src={user} alt="user-profile" />
      </div>
    </div>
  );
};

export default Navbar;
