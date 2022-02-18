import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "react-switch";

import Navbar from "./Navbar";
import { isAuth } from "../helpers/auth";
import { arrTopics, arrLanguages } from "../helpers/data";

const Settings = () => {
  const [responseData, setResponseData] = useState({
    username: "",
    userProfieImage: "",
    bio: "",
    interests: [],
    languages: [],
  });
  const [lastSeen, setLastSeen] = useState(false);
  const [birthDate, setBirthDate] = useState(true);
  const [setting, setSetting] = useState("profile");
  const [accent, setAccent] = useState("profileAccent");

  const [age, setAge] = useState(true);

  useEffect(() => {
    const id = isAuth()._id;
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      console.log(res.data);
      setResponseData({
        ...responseData,
        username: res.data.username,
        userProfieImage: res.data.userProfileImage,
        bio: res.data.bio,
        interests: res.data.interests,
        languages: res.data.languages,
      });
    });
    //eslint-disable-next-line
  }, []);

  console.log(responseData);

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
                <h3>{responseData.username}</h3>
              </div>
              <div className="user-image-wrapper">
                <img
                  src={responseData.userProfieImage}
                  alt="userProfileImage"
                />
              </div>
              <div className="user-bio-wrapper">
                <label>Bio</label>
                <textarea value={responseData.bio}>{responseData.bio}</textarea>
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
                <h3>{responseData.username}</h3>
              </div>
              <div className="settings-interests-container">
                <h3 className="accent">Interests</h3>
                <div className="filters">
                  {arrTopics.map((filter, index) => (
                    <div className="filter" key={index}>
                      {responseData.interests.includes(filter) ? (
                        <>
                          <input
                            type="checkbox"
                            name={filter}
                            key={filter}
                            checked={true}
                            title="interest"
                          />
                          <label>{filter}</label>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            name={filter}
                            key={filter}
                            checked={false}
                            title="interest"
                          />
                          <label>{filter}</label>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {setting === "languages" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>{responseData.username}</h3>
              </div>
              <div className="settings-interests-container">
                <h3 className="accent">Languages</h3>
                <div className="filters">
                  {arrLanguages.map((filter, index) => (
                    <div className="filter" key={index}>
                      {responseData.languages.includes(filter) ? (
                        <>
                          <input
                            type="checkbox"
                            name={filter}
                            key={filter}
                            checked={true}
                            title="interest"
                          />
                          <label>{filter}</label>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            name={filter}
                            key={filter}
                            checked={false}
                            title="interest"
                          />
                          <label>{filter}</label>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Settings;
