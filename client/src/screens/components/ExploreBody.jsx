import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ChatState } from "../../context/ChatProvider.jsx";
import { isAuth } from "../../helpers/auth";

import AddFriend from "./AddFriend.jsx";

const ExploreBody = () => {
  const {
    filter,
    filters,
    searchResult,
    setComponent,
    setSelectedChat,
    chats,
    setChats,
  } = ChatState();

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
    <div className="results-wrapper">
      {filter ? (
        <>
          {searchResult?.map((user) => {
            return (
              <>
                {filters.interests.some((u) => user.interests.includes(u)) ||
                filters.languages.some((u) => user.languages.includes(u)) ? (
                  <AddFriend
                    user={user}
                    key={user._id}
                    onClick={() => createChat(user._id)}
                  />
                ) : null}
              </>
            );
          })}
        </>
      ) : (
        <>
          {searchResult?.map((user) => (
            <AddFriend
              user={user}
              key={user._id}
              onClick={() => createChat(user._id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ExploreBody;
