import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import { ChatState } from "../context/ChatProvider.jsx";
import { isAuth } from "../helpers/auth";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { setSelectedChat, chats, setChats, setComponent } = ChatState();
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      toast.error("Please Enter Something to Search");
      return;
    }

    try {
      const id = isAuth()._id;

      const { data } = await axios.get(
        `http://localhost:5000/user/${id}/search?username=${search}`
      );
      setSearchResult(data);
    } catch (err) {
      toast.error("Failed to Load Search Results");
    }
  };

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
      toast.error("Error Fetching Chat Data");
    }
  };

  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Navbar />
      <ToastContainer />
      <div className="explore-wrapper">
        <div className="explore-header">
          <h2 className="accent">Find Friends</h2>
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="explore-search-bar"/>
          <button type="button" className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="explore-body">
          {searchResult?.map((user) => (
            <div
              key={user._id}
              className="add-friend"
              onClick={() => createChat(user._id)}>
              <img src={user.userProfileImage} alt="user" />
              <h2>{user.username}</h2>
              <div className="languages"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
