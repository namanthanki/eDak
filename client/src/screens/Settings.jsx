import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "react-switch";
// import { MultiSelect } from "react-multi-select-component";

import Navbar from "./Navbar";
import { isAuth } from "../helpers/auth";

const Settings = () => {
  const [responseData, setResponseData] = useState();
  const [lastSeen, setLastSeen] = useState(false);
  const [birthDate, setBirthDate] = useState(true);
  const [setting, setSetting] = useState("profile");
  const [accent, setAccent] = useState("profileAccent");
  const [selected, setSelected] = useState([]);

  const [age, setAge] = useState(true);

  const options = [
    { value: "value-1", label: "label-1" },
    { value: "value-2", label: "label-2" },
    { value: "value-3", label: "label-3" },
  ];

  useEffect(() => {
    const id = isAuth()._id;
    axios
      .get(`http://localhost:5000/user/${id}/profile_picture`)
      .then((res) => {
        setResponseData(res.data.user.userProfileImage);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="settings-wrapper">
        <div className="side-pane">
          <p
            onClick={() => {
              setSetting("profile");
              setAccent("profileAccent");
            }}
            className={`${accent} profile`}>
            Profile
          </p>
          <p
            onClick={() => {
              setSetting("interests");
              setAccent("interestAccent");
            }}
            className={`${accent} interest`}>
            Interests
          </p>
          <p
            onClick={() => {
              setSetting("languages");
              setAccent("languageAccent");
            }}
            className={`${accent} language`}>
            Languages
          </p>
        </div>
        <div className="border"></div>
        <div className="settings-body">
          {setting === "profile" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>Username</h3>
              </div>
              <div className="user-image-wrapper">
                <img src={responseData} alt="userProfileImage" />
              </div>
              <div className="user-bio-wrapper">
                <label>Bio</label>
                <textarea>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Velit, magni culpa? Eligendi inventore veritatis culpa ullam
                  magnam quos id, voluptates unde sed perspiciatis. Iste velit
                  repudiandae, debitis unde culpa magni atque dolores? Facilis
                  iure minima eaque nihil. Doloremque, eos consequatur.
                </textarea>
              </div>
              <div className="toggle-options-wrapper">
                <div className="toggle-option">
                  <span className="toggle-label">Show Last Seen</span>
                  <Switch
                    onChange={() => setLastSeen(!lastSeen)}
                    checked={lastSeen}
                    onColor="#d65a31"
                    handleDiameter={8}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={15}
                    width={40}
                  />
                </div>
                <div className="toggle-option">
                  <span className="toggle-label">Show Birthdate</span>
                  <Switch
                    onChange={() => setBirthDate(!birthDate)}
                    checked={birthDate}
                    onColor="#d65a31"
                    handleDiameter={8}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={15}
                    width={40}
                  />
                </div>
                <div className="toggle-option">
                  <span className="toggle-label">Show Age</span>
                  <Switch
                    onChange={() => setAge(!age)}
                    checked={age}
                    onColor="#d65a31"
                    handleDiameter={8}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={15}
                    width={40}
                  />
                </div>
              </div>
            </div>
          ) : null}
          {setting === "interests" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>Interest</h3>
              </div>
              <div className="user-bio-wrapper">
                {/* <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Interests"
                /> */}
              </div>
            </div>
          ) : null}
          {setting === "languages" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>Language</h3>
              </div>
              <div className="user-bio-wrapper"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Settings;
