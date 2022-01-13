import React from "react";
import Navbar from "./Navbar";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { isAuth } from "../helpers/auth";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import user from "../assets/user.png";
import illustration from "../assets/illustration.svg";

const Home = () => {
  const history = useHistory();
  const redirectLetter = () => {
    history.push("/app/letter");
  };
  const len = [0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
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
          <div className="letters">
            {len.map((i) => (
              <div className="letter" onClick={redirectLetter}>
                <div className="letter-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque libero, cum est at consequuntur placeat error
                    suscipit corrupti vero
                  </p>
                </div>
                <div className="user-name">
                  <h2>User</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
