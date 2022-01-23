import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import user from "../assets/user.png";
import illustration from "../assets/illustration.svg";
import { isAuth } from "../helpers/auth";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";
import * as moment from "moment";

const Write = () => {
  const len = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const history = useHistory();
  const redirect = () => {
    history.push("/app");
  };

  let date = moment().format("DD-MM-YYYY");

  const { selectedChat, setSelectedChat, chats, setChats, messages, setMessages, newMessage, setNewMessage} = ChatState();

  const fetchChats = async () => {
    try {
      const id = isAuth()._id;
    
      const { data } = await axios.get(`http://localhost:5000/user/chat/${id}/`);
      setChats(data);
    } catch(err) {
      toast.error("Failed to Load Chats");
    }
  }

  const getSender = (users) => {
    return users[0]._id === isAuth()._id ? users[1].username : users[0].username;
  }

  useEffect(() => {
    fetchChats();
    console.log(chats);
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault();
    if(newMessage) {
      try {
        const id = isAuth()._id;

        const config = {
          headers: {
            "Content-type": "application/json"
          }
        }

        const { data } = await axios.post(`http://localhost:5000/user/message/${id}/`, {
          content: newMessage,
          chat_id: selectedChat._id
        }, config);
        
        console.log(data);

        setNewMessage("");
        setMessages([...messages, data]);
        toast.success("Sent Successfully!");
      } catch(err) {
        console.log(err.message);
          toast.error("Failed to Send Letter");
      }
    }
  }

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  }

  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Navbar />
      <ToastContainer />
      <section className="home-showcase">
        <div className="friends-list">
          <div className="filter-wrapper">
            <div className="friends-count">
              <PeopleAltOutlinedIcon />
              <h3>Friends</h3>
              <p className="count"></p>
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
                                <img src={chat.users[1].userProfileImage} alt="user" />
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
                      <img src={selectedChat.users[1].userProfileImage} alt="profile" />
                    </div>
                  </div>
                  <div className="opened-letter-wrapper">
                    <div className="opened-letter">
                      <div className="to-details">
                        <div>
                          <h2>To: { getSender(selectedChat.users) }</h2>
                          <p>{date}</p>
                        </div>
                        <button 
                          type="submit" 
                          className="btn"
                          onClick={sendMessage}
                        >
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
                </>
              ) :
              (
                <h1> Click on a Friend to Write Letter </h1>
              )
            }
        </div>
      </section>
    </div>
  );
};

export default Write;
