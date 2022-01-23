import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [selectedMessage, setSelectedMessage] = useState();
  const [selectedMessageData, setSelectedMessageData] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [component, setComponent] = useState("defaultView");
  const [message_id, setMessage_id] = useState();

  //  const history = useHistory();

  //   useEffect(() => {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     setUser(userInfo);

  //     if (!userInfo) history.push("/");
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chats,
        setChats,
        messages,
        setMessages,
        newMessage,
        setNewMessage,
        selectedMessage,
        setSelectedMessage,
        selectedMessageData,
        setSelectedMessageData,
        socketConnected,
        setSocketConnected,
        notification,
        component,
        setComponent,
        setNotification,
        message_id,
        setMessage_id,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
