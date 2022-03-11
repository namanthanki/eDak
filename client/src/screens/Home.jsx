import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import { isAuth } from "../helpers/auth";
import { ChatState } from "../context/ChatProvider.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";

import Header from "./components/Header";
import Letters from "./components/Letters";
import Letter from "./components/Letter";
import Friends from "./components/Friends";
import Write from "./components/Write";

const ENDPOINT = `http://localhost:5000`;
let socket;
let selectedChatCompare;

const Home = () => {
  const user = isAuth();
  const {
    selectedChat,
    messages,
    setMessages,
    chats,
    setChats,
    setSocketConnected,
    notification,
    setNotification,
    component,
  } = ChatState();

  const fetchChats = async () => {
    try {
      const id = isAuth()._id;

      const { data } = await axios.get(
        `http://localhost:5000/user/chat/${id}/`
      );
      setChats(data);
    } catch (err) {
      toast.error("Failed to Load Chats");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("message received", (new_msg_received) => {
      console.log(new_msg_received);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== new_msg_received.chat._id
      ) {
        if (!notification.includes(new_msg_received)) {
          console.log(new_msg_received);
          setNotification([new_msg_received, ...notification]);
        }
      } else {
        setMessages([...messages, new_msg_received]);
      }
    });
  });

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const chat_id = selectedChat._id;
      const { data } = await axios.get(
        `http://localhost:5000/user/message/${chat_id}/`
      );
      console.log(messages);
      setMessages(data);

      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      toast.error("Failed to Retrieve Messages");
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Navbar />
      <ToastContainer />
      <section className="home-showcase">
        <Friends chats={chats} />
        <div className={`friend-letters ${component}`}>
          {component === "defaultView" ? (
            <h1 className="default-view-text">
              Click on a Friend to View Letters
            </h1>
          ) : null}
          {selectedChat ? (
            <>
              {component !== "defaultView" ? (
                <Header users={selectedChat.users} />
              ) : null}
              {component === "Letters" ? <Letters /> : null}
              {component === "Letter" ? <Letter /> : null}
              {component === "WriteLetter" ? <Write /> : null}
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Home;
