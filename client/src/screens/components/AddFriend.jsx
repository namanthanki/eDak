import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import * as moment from "moment";

import { isAuth } from "../../helpers/auth";
import { ChatState } from "../../context/ChatProvider.jsx";

const AddFriend = ({ user }) => {
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
        `http://localhost:5000/user/chat/${id}/`,
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
    <div
      className="add-friend"
      onClick={() => createChat(user._id)}
      key={user._id}>
      <div className="friend-image">
        <img src={user.userProfileImage} alt="friend" />
      </div>
      <div className="friend-details">
        <h2 className="friend-username">{user.username}</h2>
        <p className="friend-gender">{user.gender}</p>
        <p className="friend-age">
          {`Age: ${moment().diff(user.dateOfBirth, "years", false)} Years Old`}
        </p>
      </div>
    </div>
  );
};

export default AddFriend;
