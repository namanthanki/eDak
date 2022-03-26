import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { logout } from "../helpers/auth";

import Navbar from "./Navbar";
import { isAuth } from "../helpers/auth";
import { arrTopics, arrLanguages } from "../helpers/data";

import Chip from "@mui/material/Chip";
import ClearIcon from "@mui/icons-material/Clear";

const Settings = () => {
  const [responseData, setResponseData] = useState({
    username: "",
    userProfieImage: "",
    bio: "",
    interests: [],
    languages: [],
  });
  const [setting, setSetting] = useState("profile");
  const [accent, setAccent] = useState("profileAccent");

  const history = useHistory();

  useEffect(() => {
    const id = isAuth()._id;
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
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

  const deleteInterest = (interest) => {
    let tempArray = responseData.interests;
    let i = tempArray.indexOf(interest);
    tempArray.splice(i, 1);
    setResponseData({ ...responseData, interests: tempArray });
  };

  const addInterest = (interest) => {
    let tempArray = responseData.interests;
    tempArray.push(interest);
    setResponseData({ ...responseData, interests: tempArray });
  };

  const deleteLang = (lang) => {
    let tempArray = responseData.languages;
    let i = tempArray.indexOf(lang);
    tempArray.splice(i, 1);
    setResponseData({ ...responseData, languages: tempArray });
  };

  const addLang = (lang) => {
    let tempArray = responseData.languages;
    tempArray.push(lang);
    setResponseData({ ...responseData, languages: tempArray });
  };

  return (
    <div>
      <Navbar />
      {/* <ToastContainer /> */}
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
          <div className="logout-wrapper">
            <button
              onClick={() => {
                logout(() => {
                  history.push("/login");
                });
              }}
              id="logout"
              className="btn">
              Logout
            </button>
          </div>
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
            </div>
          ) : null}
          {setting === "interests" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>{responseData.username}</h3>
              </div>
              <div className="settings-data-wrapper">
                <h3>Interests</h3>
                <div className="settings-data-container">
                  {responseData.interests.map((interest) => (
                    <Chip
                      label={interest}
                      variant="outlined"
                      size="small"
                      className="data-chip"
                      deleteIcon={<ClearIcon style={{ color: "#d65a31" }} />}
                      onDelete={() => deleteInterest(interest)}
                    />
                  ))}
                </div>
                <h3>Add Interests</h3>
                <div className="settings-data-container">
                  {arrTopics.map((topic) => (
                    <>
                      {!responseData.interests.includes(topic) ? (
                        <Chip
                          label={topic}
                          variant="outlined"
                          size="small"
                          className="data-chip"
                          onClick={() => addInterest(topic)}
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <button type="button" className="btn">
                  Save
                </button>
              </div>
            </div>
          ) : null}
          {setting === "languages" ? (
            <div className="setting-container">
              <div className="username-wrapper">
                <h3>{responseData.username}</h3>
              </div>
              <div className="settings-data-wrapper">
                <h3>Languages</h3>
                <div className="settings-data-container">
                  {responseData.languages.map((language) => (
                    <Chip
                      label={language}
                      variant="outlined"
                      size="small"
                      className="data-chip"
                      deleteIcon={<ClearIcon style={{ color: "#d65a31" }} />}
                      onDelete={() => deleteLang(language)}
                    />
                  ))}
                </div>
                <h3>Add Languages</h3>
                <div className="settings-data-container">
                  {arrLanguages.map((lang) => (
                    <>
                      {!responseData.languages.includes(lang) ? (
                        <Chip
                          label={lang}
                          variant="outlined"
                          size="small"
                          className="data-chip"
                          onClick={() => addLang(lang)}
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <button type="button" className="btn">
                  Save
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Settings;
