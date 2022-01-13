import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
        .put(`${process.env.REACT_APP_API_URL}/password/forgot`, {
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
    <div className="form-wrapper">
      <ToastContainer />
      <div className="illustration"></div>
      <div className="activate-wrapper">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="field-wrapper forgot">
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange("email")}
              value={email}
            />
          </div>
          <div className="btn-wrapper">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
