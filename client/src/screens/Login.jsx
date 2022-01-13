import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth } from "../helpers/auth";
import "../styles/Components.css";
import "../styles/queries.css";
import { Redirect } from "react-router-dom";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    passwordInput: "",
  });

  const { email, passwordInput } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && passwordInput) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: passwordInput,
        })
        .then((res) => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              passwordInput: "",
            });
            history.push("/app");
            toast.success("Login Successful");
          });
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="form-wrapper">
      {isAuth() ? <Redirect to="/app" /> : null}
      <ToastContainer />
      <div className="illustration"></div>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="inner-form-wrapper">
            <h1>Login</h1>
            <a href="/register">
              Don't have an account? <span className="accent">Sign Up</span>
            </a>
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
            <div className="forgot-pswd">
              <a href="/users/password/forgot" className="accent pswd">
                Forgot Password?
              </a>
            </div>
            <div className="btn-wrapper">
              <button className="btn" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
