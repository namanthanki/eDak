import React from "react";
import { ToastContainer } from "react-toastify";
import { isAuth } from "../helpers/auth";
import { Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import ExploreHeader from "./components/ExploreHeader";
import ExploreFilter from "./components/ExploreFilter";
import ExploreBody from "./components/ExploreBody";

const Explore = () => {
  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Navbar />
      <ToastContainer />
      <div className="explore-wrapper">
        <ExploreHeader />
        <div className="explore-body">
          <ExploreFilter />
          <ExploreBody />
        </div>
      </div>
    </div>
  );
};

export default Explore;
