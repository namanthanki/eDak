import React from "react";
import ShowcaseImg from "../assets/illustration.svg";
import { Link, Redirect } from "react-router-dom";
import { isAuth } from "../helpers/auth";
import logo from "../assets/logo.svg";
import "../styles/Components.css";
import "../styles/queries.css";

function Welcome() {
  return (
    <div className="container">
      {isAuth() ? <Redirect to="/app" /> : null}
      <div className="wrapper">
        <nav className="guest-nav">
          <div className="logo-wrapper">
            <img src={logo} alt="" className="logo"></img>
          </div>
          <div className="guest-btn-wrapper">
            <Link to="/register">
              <button className="btn secondary-btn">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </div>
        </nav>
        <div className="showcase">
          <div className="showcase-text">
            <h1 className="slogan accent">
              What is
              <br />
              eDak?
            </h1>
            <p className="sub-text">
              e-Dak goes with old school idea of writing letters and sending it
              to people who live far from you, in this modern era of instant
              messaging people have lost their patience and value of long texts
              and meaningful words and emotions. eDak brings back old school
              letter writing principles and sends your message to particular X
              location in Y amount time which is calculated based on how far the
              receiving location is from the sending location.
            </p>
          </div>
          <div className="showcase-image">
            <img src={ShowcaseImg} alt=""></img>
          </div>
          <div className="button-wrapper mobile">
            <Link to="/register">
              <button className="btn secondary-btn">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
