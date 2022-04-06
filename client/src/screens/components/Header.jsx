import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";

import { ChatState } from "../../context/ChatProvider.jsx";
import { isAuth } from "../../helpers/auth";

import {
  getSender,
  getSenderImage,
  getSenderDob,
  getSenderCountry,
} from "../../helpers/userDetails";
import * as moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  borderRadius: "3px",
  boxShadow: 24,
  overflowY: "hidden",
  p: 3,
};

const confirmStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 180,
  borderRadius: "3px",
  boxShadow: 24,
  overflowY: "hidden",
  p: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const Header = ({ users }) => {
  const { selectedChat, setComponent } = ChatState();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const openConfirm = () => setConfirmOpen(true);
  const confirmClose = () => setConfirmOpen(false);

  const deleteChat = () => {
    const id = isAuth()._id;
    const chatId = selectedChat._id;
    // console.log(chatId);

    axios
      .delete(`http://localhost:5000/user/${id}/chat/delete`, {
        data: { chat_id: chatId },
      })
      .then((res) => {
        toast.success("Chat Deleted Succesfully!");
        setComponent("defaultView");
        history.push("/app");
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="letters-header">
        <div className="user-details">
          <h2>{getSender(users)}</h2>
          <div className="sub-details">
            <p>{getSenderCountry(users) || `Country`}</p>
            <p>{`Age: ${moment().diff(
              getSenderDob(users),
              "years",
              false
            )}`}</p>
          </div>
        </div>
        <div className="user-image">
          <img src={getSenderImage(users)} alt="profile" onClick={handleOpen} />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={style}
          padding="5px"
          height="100%"
          width="100%"
          className="modal-box">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start">
            <button className="btn btn-small" onClick={handleClose}>
              X
            </button>
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            gap="2px">
            <img
              src={users[1].userProfileImage}
              alt="user-profile-"
              width="35%"
            />
            <h3 className="username">{users[1].username}</h3>
            <Stack>
              <label
                style={{
                  textAlign: "center",
                  marginBottom: "5px",
                  color: "#db814d",
                }}
                htmlFor="bio">
                Bio
              </label>
              <p className="other-details" id="bio">
                {users[1].bio}
              </p>
            </Stack>
            <Stack
              direction="column"
              spacing={1}
              height="250px"
              width="100%"
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="8px">
              <p className="other-details">
                <span className="modal-labels">Age: </span>
                {`${moment().diff(
                  users[1].dateOfBirth,
                  "years",
                  false
                )} Years Old`}
              </p>
              <p className="other-details">
                <span className="modal-labels">Country: </span>
                {`${users[1].location.features[0].properties.country}`}
              </p>
              <label htmlFor="friend-interests" className="modal-labels">
                Interests:
              </label>
              <div id="friend-interests" className="user-interests-wrapper">
                {users[1].interests.map((interest) => (
                  <>
                    <Chip
                      key={interest}
                      label={interest}
                      variant="outlined"
                      size="small"
                      className="user-interests"
                    />
                  </>
                ))}
              </div>
              <label className="modal-labels" htmlFor="friend-languages">
                Languages:
              </label>
              <div id="friend-languages" className="user-interests-wrapper">
                {users[1].languages.map((language) => (
                  <Chip
                    key={language}
                    label={language}
                    variant="outlined"
                    size="small"
                    className="user-interests"
                  />
                ))}
              </div>
            </Stack>
            <button className="btn btn-full btn-error" onClick={openConfirm}>
              Delete Chat?
            </button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={confirmOpen}
        onClose={confirmClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={confirmStyle} className="modal-box">
          <Stack direction="row">
            <h3>Are You Sure You Want To Delete This Chat?</h3>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            width="100%"
            gap="15px">
            <button className="btn secondary-btn" onClick={deleteChat}>
              Yes
            </button>
            <button className="btn" onClick={confirmClose}>
              No
            </button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
