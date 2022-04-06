import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { isAuth } from "../helpers/auth";
import { Redirect } from "react-router-dom";

import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

const Forgot = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      let id = toast.info("Please Wait...", { autoClose: false });
      axios
        .put(`api/password/forgot`, {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
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
      toast.error("Provide proper email address");
    }
  };

  return (
    <div className="auth-container">
      {isAuth() ? <Redirect to="/app" /> : null}
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      />
      <div className="illustration register"></div>
      <div className="auth-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <h1>Change Password</h1>
            <div className="field-wrapper">
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="btn-wrapper">
              <button type="submit" className="btn btn-full">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
