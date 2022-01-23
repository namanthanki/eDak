import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { isAuth } from "../helpers/auth";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// import user from "../assets/user.png";
import illustration from "../assets/illustration.svg";
import { ChatState } from "../context/ChatProvider.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";

const ENDPOINT = `http://localhost:5000`;
let socket;
let selectedChatCompare;
const user = isAuth();

const Home = () => {
  const history = useHistory();
  
  const { selectedChat, setSelectedChat, messages, setMessages,chats, setChats, selectedMessage, setSelectedMessage, socketConnected, setSocketConnected, notification, setNotification } = ChatState();

  const redirectLetter = (id) => {
    setSelectedMessage(id);
    history.push("/app/letter");
  };
  
  const fetchChats = async () => {
    try {
      const id = isAuth()._id;
    
      const { data } = await axios.get(`http://localhost:5000/user/chat/${id}/`);
      setChats(data);
    } catch(err) {
      toast.error("Failed to Load Chats");
    }
  }

  const fetchMessages = async () => {
    if(!selectedChat) return;

    try {
      const chat_id = selectedChat._id;
      const { data } = await axios.get(`http://localhost:5000/user/message/${chat_id}/`);
      console.log(messages);
      setMessages(data);

      socket.emit("join chat", selectedChat._id);
    } catch(err) {
        toast.error("Failed to Retrieve Messages");
    }
  }

  const getSender = (users) => {
    return users[0]._id === isAuth()._id ? users[1].username : users[0].username;
  }

  const getSenderImage = (users) => {
    return users[0]._id === isAuth()._id ? users[1].userProfileImage : users[0].userProfileImage;
  }

  useEffect(() => {
    fetchChats();
    console.log(chats);
  }, [])

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true) )
  }, []);

  useEffect(() => {
    socket.on("message received", (new_msg_received) => {
      if(!selectedChatCompare || selectedChatCompare._id !== new_msg_received.chat._id) {
        if(!notification.includes(new_msg_received)) {
          setNotification([new_msg_received, ...notification]);
        }  
      }
      else {
        setMessages([...messages, new_msg_received]);
      }
    })
  })

  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Navbar />
      <section className="home-showcase">
        <div className="friends-list">
          <div className="filter-wrapper">
            <div className="friends-count">
              <PeopleAltOutlinedIcon />
              <h3>Friends</h3>
              <p className="count"> </p>
            </div>
            <button className="btn">Filter</button>
          </div>
          {
            chats ? 
                  (
                    <div className="list-wrapper">
                      {
                        chats.map((chat) => {
                          return (
                            <div onClick={() => setSelectedChat(chat)} className="friends" key={chat._id}>
                              <div className="friend-details">
                                <h3>{ getSender(chat.users) }</h3>
                                <p>Country</p>
                              </div>
                              <div className="friend-image">
                                <img src={getSenderImage(chat.users)} alt="user" />
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : null
          }
        </div>
        <div className="friend-letters">
          {
            selectedChat ?
              (
                <>
                  <div className="letters-header">
                    <div className="user-details">
                      <h2>{ getSender(selectedChat.users) }</h2>
                      <div className="sub-details">
                        <p>Country</p>
                        <p>Birthdate</p>
                      </div>
                    </div>
                    <div className="user-image">
                      <img src={getSenderImage(selectedChat.users)} alt="profile" />
                    </div>
                  </div>
                  <div className="letters">
                    {messages && messages.map((msg, idx) => (
                      <div className="letter" onClick={() => redirectLetter(msg._id)} key={msg._id}>
                        <div className="letter-content">
                          <p>
                            { msg.content }
                          </p>
                        </div>
                        <div className="user-name">
                          <h2>{ msg.sender.username }</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : 
              (
                <h1> Click on a Friend to View Letters </h1>
              )
          }
        </div>
      </section>
    </div>
  );
};

export default Home;
