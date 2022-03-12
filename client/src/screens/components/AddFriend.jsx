import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import * as moment from "moment";

import { isAuth } from "../../helpers/auth";
import { ChatState } from "../../context/ChatProvider.jsx";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "#2f3642",
  borderRadius: "3px",
  boxShadow: 24,
  overflowY: "hidden",
  p: 3,
};

const userInterestsWrapper = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  maxHeight: "85px",
  gap: "5px",
};

const userInterests = {
  display: "flex",
  flexWrap: "wrap",
  color: "#eeeeeeab",
  borderColor: "#d65a31",
  fontSize: ".6em",
};

const otherDetails = {
  fontSize: "13px",
  color: "#eeeeeeab",
  textAlign: "center",
};

const AddFriend = ({ user }) => {
  const { setComponent, setSelectedChat, chats, setChats } = ChatState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const createChat = async (userId) => {
    try {
      const id = isAuth()._id;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/user/chat/${id}/`,
        { userId },
        config
      );
      setComponent("WriteLetter");
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      history.push("/app");
    } catch (err) {
      console.log(err.message);
      toast.error("Error Fetching Chat Data");
    }
  };
  return (
    <>
      <div className="add-friend" onClick={handleOpen} key={user._id}>
        <div className="friend-image">
          <img src={user.userProfileImage} alt="friend" />
        </div>
        <div className="friend-details">
          <h2 className="friend-username">{user.username}</h2>
          <p className="friend-gender">{user.gender}</p>
          <p className="friend-age">
            {`Age: ${moment().diff(
              user.dateOfBirth,
              "years",
              false
            )} Years Old`}
          </p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} padding="5px" height="100%" width="100%">
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
            gap="2px"
            // divider={
            //   <Divider
            //     orientation="horizontal"
            //     flexItem
            //     style={{
            //       borderColor: "#eeeeee12",
            //       width: "50px",
            //       alignSelf: "center",
            //     }}
            //   />
          >
            <img src={user.userProfileImage} alt="user-profile-" width="35%" />
            <h3 style={{ marginBottom: "5px", color: "#eeeeee" }}>
              {user.username}
            </h3>
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
              <p style={otherDetails} id="bio">
                {user.bio}
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
              <p style={otherDetails}>
                <span className="modal-labels">Age: </span>
                {`${moment().diff(user.dateOfBirth, "years", false)} Years Old`}
              </p>
              <p style={otherDetails}>
                <span className="modal-labels">Country: </span>
                {`${user.location.features[0].properties.country}`}
              </p>
              <label htmlFor="friend-interests" className="modal-labels">
                Interests:
              </label>
              <div id="friend-interests" style={userInterestsWrapper}>
                {user.interests.map((interest) => (
                  <>
                    <Chip
                      label={interest}
                      variant="outlined"
                      size="small"
                      style={userInterests}
                    />
                    {console.log(interest)}
                  </>
                ))}
              </div>
              <label className="modal-labels" htmlFor="friend-languages">
                Languages:
              </label>
              <div id="friend-languages" style={userInterestsWrapper}>
                {user.languages.map((language) => (
                  <Chip
                    label={language}
                    variant="outlined"
                    size="small"
                    style={userInterests}
                  />
                ))}
              </div>
            </Stack>
            <button className="btn" onClick={() => createChat(user._id)}>
              Add
            </button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AddFriend;
