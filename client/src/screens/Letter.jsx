import React from "react";
import Navbar from "./Navbar";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import user from "../assets/user.png";
import illustration from "../assets/illustration.svg";
import { useHistory } from "react-router";

const Write = () => {
  const history = useHistory();
  const redirect = () => {
    history.push("/app");
  };
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
              <div className="friends" key={i} onClick={redirect}>
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
                  aspernatur. Saepe nihil pariatur ea ducimus excepturi?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Write;
