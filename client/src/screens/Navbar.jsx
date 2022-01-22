import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { logout } from "../helpers/auth";
import { Link } from "react-router-dom";
import { isAuth } from "../helpers/auth";

import logo from "../assets/logo.svg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const Navbar = () => {
  const history = useHistory();

  const [responseData, setResponseData] = useState();

  useEffect(() => {
    const id = isAuth()._id;
    axios
      .get(`http://localhost:5000/user/${id}/profile_picture`)
      .then((res) => {
        setResponseData(res.data.user.userProfileImage);
      });
  }, []);

  return (
    <div className="nav-wrapper">
      <div className="logo-wrapper">
        <img
          src={logo}
          alt="logo"
          onClick={() => history.push("/app")}
          className="logo"
        />
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
          className="access-item"
        />

        <img
          src={responseData}
          alt="userProfileImage"
          onClick={() => history.push("/app/settings")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Navbar;
