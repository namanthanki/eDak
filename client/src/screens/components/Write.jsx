import { getSender } from "../../helpers/userDetails";
import { ChatState } from "../../context/ChatProvider.jsx";
import axios from "axios";
import * as moment from "moment";
import io from "socket.io-client";
import { useEffect } from "react";

import { isAuth } from "../../helpers/auth";
import { toast, ToastContainer } from "react-toastify";

const ENDPOINT = `http://localhost:5000`;
let socket;
const user = isAuth();

const Write = () => {
  const {
    setNewMessage,
    setMessages,
    newMessage,
    selectedChat,
    messages,
    setComponent,
    setSocketConnected,
  } = ChatState();

  let date = moment().format("DD-MM-YYYY");

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
    // eslint-disable-next-line
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage) {
      try {
        const id = isAuth()._id;

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          `http://localhost:5000/user/message/${id}/`,
          {
            content: newMessage,
            chat_id: selectedChat._id,
          },
          config
        );

        console.log(data);

        setNewMessage("");
        setMessages([...messages, data]);
        socket.emit("new message", data);
        toast.success("Sent Successfully!");
        setComponent("Letters");
      } catch (err) {
        console.log(err.message);
        toast.error("Failed to Send Letter");
      }
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      />
      {selectedChat ? (
        <div className="opened-letter-wrapper">
          <div className="opened-letter">
            <div className="to-details">
              <div>
                <h2>To: {getSender(selectedChat.users)}</h2>
                <p>{date}</p>
              </div>
              <button type="submit" className="btn" onClick={sendMessage}>
                Send
              </button>
            </div>
            <div className="writing-area">
              <textarea
                value={newMessage}
                onChange={handleChange}
                name="letter"
                placeholder="Start Typing Letter..."></textarea>
            </div>
          </div>
        </div>
      ) : (
        toast.error("Select a chat first")
      )}
    </>
  );
};

export default Write;
