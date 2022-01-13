import React from "react";

import Navbar from "./Navbar";
import user from "../assets/user.png";
import { isAuth } from "../helpers/auth";
import { Redirect } from "react-router-dom";

const Explore = () => {
  const len = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Navbar />
      <div className="explore-wrapper">
        <div className="explore-header">
          <h2 className="accent">Find Friends</h2>
          <button className="btn">Filter</button>
        </div>
        <div className="explore-body">
          {len.map((i) => (
            <div className="add-friend">
              <img src={user} alt="user" />
              <h2>Username</h2>
              <div className="languages">
                <p>
                  language, language <br />
                  language, language
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
