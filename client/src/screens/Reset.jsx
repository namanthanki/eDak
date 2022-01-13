import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  }, [formData, match.params.token]);

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === confirmPassword && passwordInput && confirmPassword) {
      let id = toast.info("Please Wait...", { autoClose: false });
      axios
        .put(`${process.env.REACT_APP_API_URL}/password/reset`, {
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
    <div className="form-wrapper">
      <ToastContainer />
      <div className="illustration"></div>
      <div className="activate-wrapper">
        <h1>Reset Your Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="field-wrapper forgot">
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange("passwordInput")}
              value={passwordInput}
            />
          </div>
          <div className="field-wrapper forgot">
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange("confirmPassword")}
              value={confirmPassword}
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

export default Reset;
