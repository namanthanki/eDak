import React, { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Letters = () => {
  const {
    setSelectedMessage,
    setComponent,
    message_id,
    setMessage_id,
    messages,
  } = ChatState();

  const renderLetter = (msg_id) => {
    setMessage_id(msg_id);
    setSelectedMessage(message_id);
    setComponent("Letter");
  };

  return (
    <>
      <div className="letters">
        {messages &&
          messages.map((msg) => (
            <div
              className="letter"
              onClick={() => renderLetter(msg._id)}
              key={msg._id}>
              <div className="letter-content">
                <p>{msg.content}</p>
              </div>
              <div className="user-name">
                <h2>{msg.sender.username}</h2>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Letters;
