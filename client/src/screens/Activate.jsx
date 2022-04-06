import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jwt from "jsonwebtoken";
import { isAuth } from "../helpers/auth";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    username: "",
    token: "",
    show: true,
  });

  const history = useHistory();

  useEffect(() => {
    let token = match.params.token;
    let { username } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, username, token });
    }
    // eslint-disable-next-line
  }, [match.params]);

  // eslint-disable-next-line
  const { username, token, show } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/activate`, {
        token,
      })
      .then((res) => {
        setFormData({ ...formData, show: false });
        toast.success(res.data.message);
        history.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
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
            <h1 className="accent">Account Activation</h1>
            <div className="btn-wrapper">
              <button type="submit" className="btn btn-full">
                Activate
              </button>
            </div>
            <div className="btn-wrapper">
              <button className="btn secondary-btn btn-full">
                <Link to="/register">Sign Up</Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Activate;
