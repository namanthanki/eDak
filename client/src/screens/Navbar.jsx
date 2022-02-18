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
import { toast } from "react-toastify";
import { ChatState } from "../context/ChatProvider.jsx";

const Navbar = () => {
  const history = useHistory();
  const [responseData, setResponseData] = useState();

  useEffect(() => {
    const id = isAuth()._id;
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      setResponseData(res.data.userProfileImage);
    });
  }, []);

  const { setComponent, selectedChat } = ChatState();

  return (
    <div className="nav-wrapper">
      <div className="logo-wrapper">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            history.push("/app");
            setComponent("defaultView");
          }}
          className="logo"
        />
      </div>
      <div className="accessibility-wrapper">
        <Link to="/app/explore">
          <PersonAddIcon className="access-item" />
        </Link>
        <NotificationsOutlinedIcon className="access-item" />
        <CreateIcon
          className="access-item"
          onClick={() => {
            selectedChat
              ? setComponent("WriteLetter")
              : toast.error("Select a chat First");
          }}
          style={{ cursor: "pointer" }}
        />
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
