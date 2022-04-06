import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { isAuth } from "../../helpers/auth";
import { ChatState } from "../../context/ChatProvider.jsx";

const FriendProfile = ({ user }) => {
  const { setComponent, setSelectedChat, chats, setChats } = ChatState();

  const history = useHistory();

  const createChat = async (userId) => {
    try {
      const id = isAuth()._id;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/user/chat/${id}/`,
        { userId },
        config
      );
      setComponent("WriteLetter");
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      history.push("/app");
    } catch (err) {
      console.log(err.message);
      toast.error("Error Fetching Chat Data");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button type="button" onClick={() => setComponent("addFriendView")}>
          X
        </button>
      </div>
      <div className="profile-picture-wrapper">
        <img src="" alt="user" />
      </div>
      <div className="profile-details">
        <h3>Username</h3>
        <p>Age</p>
        <p>Gender</p>
        <p>Bio</p>
      </div>
      <div className="profile-interests">
        <div className="interests">
          <ul>
            <li>interest</li>
            <li>interest</li>
            <li>interest</li>
          </ul>
        </div>
        <div className="languages">
          <ul>
            <li>lang</li>
            <li>lang</li>
            <li>lang</li>
          </ul>
        </div>
      </div>
      <div className="profile-footer">
        <button type="button" onClick={() => createChat(user._id)}>
          Send Letter
        </button>
      </div>
    </div>
  );
};

export default FriendProfile;
