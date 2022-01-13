import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../helpers/auth";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import user from "../assets/user.png";
import {arrTopics, arrLanguages} from "../helpers/data";

import dotenv from "dotenv";
dotenv.config({
    path: "../../.env"
});

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordInput: "",
    confirmPassword: "",
    bio: "",
    dateOfBirth: "",
    gender: "",
    interests: [],
    languages: []
  });

  const { username, email, passwordInput, confirmPassword, bio, dateOfBirth, gender, interests, languages } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    let id;
    if (email && passwordInput) {
      if (passwordInput === confirmPassword) {
        id = toast.info("Please Wait...", { autoClose: false });
        axios
          .post(`http://localhost:5000/api/register`, {
            username,
            email,
            password: passwordInput,
            bio,
            dateOfBirth,
            gender,
            interests,
            languages
          })
          .then((res) => {
            console.log(formData);
            setFormData({
              ...formData,
              username: "",
              email: "",
              passwordInput: "",
              confirmPassword: "",
              bio: "",
              dateOfBirth: "",
              gender: "",
              interests: [],
              languages: []
            });
            toast.update(id, {
              render: res.data.message,
              type: "success",
              isLoading: false,
            });
          })
          .catch((err) => {
            toast.update(id, {
              render: err.response.data.errors,
              type: "error",
              isLoading: false,
            });
          });
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const errorHandling = () => {
    if(count === 1) {
      if(email && passwordInput && confirmPassword) {
        if(passwordInput.length < 8) {
          toast.error(
            "Please Enter Minimum 8 Characters"
          );
          setCount(1);
        }
        else if(passwordInput.length !== confirmPassword.length) {
          toast.error(
            "Passwords Don't Match"
          );
          setCount(1);
        }
      } else {
        toast.error(
          "Please Fill in All Fields"
        );
        setCount(1);
      }
    }
    if (count === 3) {
      if (formData.interests.length < 5) {
        toast.error(
          `Only ${formData.interests.length} Topics Added, Minimum 5 Required!`
        );
        setCount(3);
      }
    } else if (count === 4) {
      if (formData.languages.length < 1) {
        toast.error(
          `Only ${formData.languages.length} Languages Selected, Minimum 1 Required!`
        );
        setCount(4);
      }
    }
  };

  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
    errorHandling();
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleArrays = (type) => (e) => {
    let data = document.getElementById([type]).value;
    if (type === "topic") {
      if (!formData.interests.includes(data)) {
        formData.interests.push(data);
        toast.success(`${data} added as your topic`);
      } else {
        toast.error(`${data} is already added`);
      }
    } else {
      if (!formData.languages.includes(data)) {
        formData.languages.push(data);
        toast.success(`${data} added as your language`);
      } else {
        toast.error(`${data} is already added`);
      }
    }
  };

  const handleChange = (type) => (e) => {
    if (!(type === "topics" && type === "languages")) {
      setFormData({ ...formData, [type]: e.target.value });
    }
  };

  return (
    <div className="form-wrapper">
      {isAuth() ? <Redirect to="/app" /> : null}
      <ToastContainer />
      <div className="illustration sign-up"></div>
      <div className="login-wrapper">
        {count === 1 ? (
          <form>
            <div className="inner-form-wrapper">
              <h1>Sign Up</h1>
              <Link to="/login">
                Already have an account? <span className="accent">Login</span>
              </Link>
              <div className="field-wrapper">
                <label>Email *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                />
              </div>
              <div className="field-wrapper">
                <label>Password *</label>
                <input
                  name="passwordInput"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("passwordInput")}
                />
              </div>
              <div className="field-wrapper">
                <label>Confirm Password *</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange("confirmPassword")}
                />
              </div>
              <div className="btn-wrapper">  
                <button type="button" className="btn" onClick={increaseCount}>
                  Continue
                </button>
              </div>
            </div>
          </form>
          ): null}
          {count === 2 ? (
            <form>
              <div className="inner-form-wrapper">
                <div className="field-wrapper img">
                  <img src={user} alt="user-profile" className="user-img" />
                </div>
                <div className="field-wrapper">
                  <label>Username</label>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    onChange={handleChange("username")}
                  />
                </div>
                <div className="field-wrapper">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    placeholder="Bio"
                    onChange={handleChange("bio")}
                  >  
                  </textarea>
                </div>
                <div className="field-wrapper row">
                  <div className="col">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      onChange={handleChange("dateOfBirth")}
                    />
                  </div>
                  <div className="col">
                    <label>Gender</label>
                    <select
                      name="gender"
                      required
                      onChange={handleChange("gender")}
                    >
                      <option value="default" defaultValue>-Select-</option>
                      <option value="Male">
                        Male
                      </option>
                      <option value="Female">
                        Female
                      </option>
                      <option value="Non-Binary">
                        Non-Binary
                      </option>
                    </select>
                  </div>
                </div>

                <div className="btn-wrapper continue-first">
                  <button className="btn" type="button" onClick={increaseCount}>
                    Continue
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          {count === 3 ? (
            <form>
              <div className="inner-form-wrapper">
                <h1>Topics Of Interests</h1>
                <div className="field-wrapper topics">
                  <select name="topics" id="topic">
                    {arrTopics.map((topic, index) => (
                      <option key={index} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn"
                    type="button"
                    onClick={handleArrays("topic")}>
                    Add
                  </button>
                </div>
                <div className="btn-wrapper continue">
                  <button className="btn" type="button" onClick={decreaseCount}>
                    Back
                  </button>
                  <button className="btn" type="button" onClick={increaseCount}>
                    Continue
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          {count === 4 ? (
            <form>
              <div className="inner-form-wrapper">
                <h1>Your Languages</h1>
                <p>Add the languages that you speak or use</p>
                <div className="field-wrapper topics">
                  <select name="languages" id="lang">
                    {arrLanguages.map((language, index) => (
                      <option value={language} key={index}>{language}</option>
                    ))}
                  </select>
                  <button
                    className="btn"
                    type="button"
                    onClick={handleArrays("lang")}>
                    Add
                  </button>
                </div>
                <div className="btn-wrapper continue">
                  <button type="button" className="btn" onClick={decreaseCount}>
                    Back
                  </button>
                  <button type="submit" className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          ) : null}
      </div>
    </div>
  );
};

export default Register;


// old 

/* <form onSubmit={handleSubmit}>
          <div className="inner-form-wrapper">
            <h1>Sign Up</h1>
            <Link to="/login">
              Already have an account? <span className="accent">Login</span>
            </Link>
            <div className="field-wrapper">
              <label>Email *</label>
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="field-wrapper">
              <label>Password *</label>
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange("passwordInput")}
                value={passwordInput}
              />
            </div>
            <div className="field-wrapper">
              <label>Confirm Password *</label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange("confirmPassword")}
                value={confirmPassword}
              />
            </div>
            <div className="btn-wrapper">
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form> */