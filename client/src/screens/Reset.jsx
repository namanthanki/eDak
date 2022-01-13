import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { isAuth } from "../helpers/auth";
import { Redirect } from "react-router-dom";

const Reset = ({ match }) => {
  const [formData, setFormData] = useState({
    passwordInput: "",
    confirmPassword: "",
    token: "",
  });

  const { passwordInput, confirmPassword, token } = formData;
  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({
        ...formData,
        token,
      });
    }
  }, [match.params.token]);

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === confirmPassword && passwordInput && confirmPassword) {
      let id = toast.info("Please Wait...", { autoClose: false });
      axios
        .put(`http://localhost:5000/api/password/reset`, {
          newPassword: passwordInput,
          resetPasswordLink: token,
        })
        .then((res) => {
          setFormData({ ...formData, passwordInput: "", confirmPassword: "" });
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
      toast.error(`Passwords don't match`);
    }
  };

  return (
    <div className="auth-container">
      {isAuth() ? <Redirect to="/app" /> : null}
      <ToastContainer />
      <div className="illustration login"></div>
      <div className="auth-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <h1>Reset Your Password</h1>
            <div className="field-wrapper">
              <input
                name="passwordInput"
                type="password"
                placeholder="Password"
                onChange={handleChange("passwordInput")}
                value={passwordInput}
              />
            </div>
            <div className="field-wrapper">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange("confirmPassword")}
                value={confirmPassword}
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

export default Reset;
