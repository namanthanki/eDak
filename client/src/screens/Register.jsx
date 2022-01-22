import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../helpers/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { arrTopics, arrLanguages } from "../helpers/data";

import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
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
    languages: [],
  });

  const {
    username,
    email,
    passwordInput,
    confirmPassword,
    bio,
    dateOfBirth,
    gender,
    interests,
    languages,
  } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    let id;
    if (email && passwordInput) {
      if (passwordInput === confirmPassword) {
        id = toast.info("Please Wait...", { autoClose: false });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            username,
            email,
            password: passwordInput,
            bio,
            dateOfBirth,
            gender,
            interests,
            languages,
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
              languages: [],
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
    if (count === 1) {
      if (email && passwordInput && confirmPassword) {
        if (passwordInput.length < 8) {
          toast.error("Please Enter Minimum 8 Characters");
          setCount(1);
        } else if (passwordInput.length !== confirmPassword.length) {
          toast.error("Passwords Don't Match");
          setCount(1);
        }
      } else {
        toast.error("Please Fill in All Fields");
        setCount(1);
      }
    }
    if (count === 2) {
      if (username && bio && dateOfBirth && gender) {
        if (gender === "-Select-") {
          toast.error("Please Select Your Gender");
          setCount(2);
        }
      } else {
        toast.error("Please Fill in All Fields");
        setCount(2);
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
    if (type === "interest") {
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

  const history = useHistory();

  const redirect = () => {
    history.push("/login");
  };

  return (
    <div className="auth-container">
      {isAuth() ? <Redirect to="/app" /> : null}
      <ToastContainer />
      <div className="illustration register"></div>
      <div className="auth-wrapper">
        {count === 1 ? (
          <form>
            <div className="form-wrapper">
              <h1>Sign Up</h1>
              <p>
                Already have an account?{" "}
                <span
                  className="accent"
                  onClick={redirect}
                  style={{ cursor: "pointer" }}>
                  Login
                </span>
              </p>
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
                <button
                  type="button"
                  className="btn btn-full"
                  onClick={increaseCount}>
                  Continue
                </button>
              </div>
            </div>
          </form>
        ) : null}
        {count === 2 ? (
          <form>
            <div className="form-wrapper">
              <div className="field-wrapper user-img">
                <img
                  src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
                  alt="userProfileImage"
                />
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
                  onChange={handleChange("bio")}></textarea>
              </div>
              <div className="field-wrapper">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  onChange={handleChange("dateOfBirth")}
                />
              </div>
              <div className="field-wrapper">
                <label>Gender</label>
                <select
                  name="gender"
                  required
                  onChange={handleChange("gender")}>
                  <option value="-Select-" selected hidden>
                    -Select-
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                </select>
              </div>

              <div className="btn-wrapper">
                <button
                  className="btn btn-full"
                  type="button"
                  onClick={increaseCount}>
                  Continue
                </button>
              </div>
            </div>
          </form>
        ) : null}
        {count === 3 ? (
          <form>
            <div className="form-wrapper">
              <h1>Topics Of Interests</h1>
              <div className="field-wrapper row">
                <select name="interests" id="interest">
                  {arrTopics.map((interest, index) => (
                    <option key={index} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
                <button
                  className="btn"
                  type="button"
                  onClick={handleArrays("interest")}>
                  Add
                </button>
              </div>
              <div className="btn-wrapper col">
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
            <div className="form-wrapper">
              <h1>Your Languages</h1>
              <p>Add the languages that you speak or use</p>
              <div className="field-wrapper row">
                <select name="languages" id="lang">
                  {arrLanguages.map((language, index) => (
                    <option value={language} key={index}>
                      {language}
                    </option>
                  ))}
                </select>
                <button
                  className="btn"
                  type="button"
                  onClick={handleArrays("lang")}>
                  Add
                </button>
              </div>
              <div className="btn-wrapper col">
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

// Old
