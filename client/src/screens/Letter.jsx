import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Redirect } from "react-router-dom";
import { ChatState } from "../context/ChatProvider.jsx";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import user from "../assets/user.png";
import illustration from "../assets/illustration.svg";
import { useHistory } from "react-router";
import { isAuth } from "../helpers/auth";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";

const Letter = () => {
  const history = useHistory();
  const redirect = () => {
    history.push("/app");
  };
  const len = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const { selectedChat, setSelectedChat, messages, setMessages, chats, setChats, selectedMessage, setSelectedMessage, selectedMessageData, setSelectedMessageData } = ChatState();
  const fetchChats = async () => {
    try {
      const id = isAuth()._id;
    
      const { data } = await axios.get(`http://localhost:5000/user/chat/${id}/`);
      setChats(data);
    } catch(err) {
      toast.error("Failed to Load Chats");
    }
  }

  const fetchMessage = async () => {
    if(!selectedChat) return;

    try {
      const message_id = selectedMessage;
      const { data } = await axios.get(`http://localhost:5000/user/message/read/${message_id}/`);
      setSelectedMessageData(data);
    } catch(err) {
        toast.error("Failed to Retrieve Message");
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
    fetchMessage();
  }, [selectedMessageData]);

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
                  <div className="opened-letter-wrapper">
                    <div className="opened-letter">
                      <div className="to-details">
                        <div>
                          <h2>To: Username</h2>
                          <p>Date</p>
                        </div>
                      </div>
                      <div className="writing-area">
                        <p> 
                          { selectedMessageData ? (selectedMessageData.content) : null }
                        </p>
                      </div>
                    </div>
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

export default Letter;


/*
<div className="friend-letters">
          <div className="letters-header">
            <div className="user-details">
              <h2>friendname</h2>
              <div className="sub-details">
                <p>Country</p>
                <p>Birthdate</p>
              </div>
            </div>
            <div className="user-image">
              <img src={illustration} alt="profile" />
            </div>
          </div>
          <div className="opened-letter-wrapper">
            <div className="opened-letter">
              <div className="to-details">
                <div>
                  <h2>To: Username</h2>
                  <p>Date</p>
                </div>
              </div>
              <div className="writing-area">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam quos accusantium sit itaque rem voluptates at sunt
                  animi vel excepturi fugiat ipsum, magnam earum modi recusandae
                  aliquid delectus impedit. Omnis maxime optio explicabo, eos
                  corrupti harum eveniet ut excepturi deleniti consequuntur
                  architecto pariatur provident! Dolorem, nostrum animi debitis
                  illum eius magni at distinctio eaque quod rem amet eligendi
                  quasi repudiandae repellendus tempora sunt aut maiores odit
                  inventore nemo beatae soluta.
                  <br />
                  <br />
                  Harum earum laudantium maxime corporis amet provident
                  architecto perspiciatis asperiores? Ad ea facere ipsa! Labore
                  consequuntur delectus iusto sapiente inventore sint ipsa,
                  cupiditate nemo tempore ea molestiae temporibus atque vel?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate corrupti repellendus accusamus quod? Hic, deserunt?
                  <br />
                  <br />
                  Laborum rem nisi saepe voluptas dignissimos distinctio
                  voluptatum provident, corporis nostrum qui labore ad, earum
                  illo amet cupiditate blanditiis molestiae eius dolorem
                  possimus beatae consequatur sed doloremque officiis
                  aspernatur. Saepe nihil pariatur ea ducimus excepturi? Laborum
                  rem nisi saepe voluptas dignissimos distinctio voluptatum
                  provident, corporis nostrum qui labore ad, earum illo amet
                  cupiditate blanditiis molestiae eius dolorem possimus beatae
                  consequatur sed doloremque officiis aspernatur. Saepe nihil
                  pariatur ea ducimus excepturi?
                </p>
              </div>
            </div>
          </div>
        </div>
*/