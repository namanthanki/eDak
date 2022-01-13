import React from "react";
import { useHistory } from "react-router";
import { logout } from "../helpers/auth";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import user from "../assets/user.png";

const Navbar = () => {
  const history = useHistory();
  const redirect = () => {
    history.push("/app");
  };
  return (
    <div className="nav-wrapper">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" onClick={redirect} className="logo" />
      </div>
      <div className="accessibility-wrapper">
        <Link to="/app/explore">
          <PersonAddIcon className="access-item" />
        </Link>
        <Link to="/">
          <NotificationsOutlinedIcon className="access-item" />
        </Link>
        <Link to="/app/write">
          <CreateIcon className="access-item" />
        </Link>
        <LogoutIcon
          onClick={() => {
            logout(() => {
              history.push("/login");
            });
          }}
          style={{ cursor: "pointer" }}
          id="logout"
        />
        <img src={user} alt="user-profile" />
      </div>
    </div>
  );
};

export default Navbar;
