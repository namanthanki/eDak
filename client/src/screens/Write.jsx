import React from "react";
import Navbar from "./Navbar";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import user from "../assets/user.png";
import illustration from "../assets/illustration.svg";

const Write = () => {
  const len = [0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div>
      <Navbar />
      <section className="main-showcase">
        <div className="friends-list">
          <div className="filter-wrapper">
            <div className="friends-count">
              <PeopleAltOutlinedIcon />
              <h3>Friends</h3>
              <p className="count">50</p>
            </div>
            <button className="btn">Filter</button>
          </div>
          <div className="list-wrapper">
            {len.map((i) => (
              <div className="friends" key={i}>
                <div className="friend-details">
                  <h3>friendname</h3>
                  <p>Country</p>
                </div>
                <div className="friend-image">
                  <img src={user} alt="user" />
                </div>
              </div>
            ))}
          </div>
        </div>
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
          <div className="letter-wrapper">
            <div className="opened-letter">
              <div className="to-details">
                <div>
                  <h2>To: Username</h2>
                  <p>Date</p>
                </div>
                <button className="btn">Send</button>
              </div>
              <div className="writing-area">
                <textarea
                  name="letter"
                  placeholder="Start Typing Letter..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Write;
