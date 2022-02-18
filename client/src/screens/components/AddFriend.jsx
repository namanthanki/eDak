import React from "react";
import * as moment from "moment";

import Modal from "./Modal";

const AddFriend = ({ user }) => {
  return (
    <div className="add-friend" onClick={() => <Modal />}>
      <div className="friend-image">
        <img src={user.userProfileImage} alt="friend" />
      </div>
      <div className="friend-details">
        <h2 className="friend-username">{user.username}</h2>
        <p className="friend-gender">{user.gender}</p>
        <p className="friend-age">
          {`Age: ${moment().diff(user.dateOfBirth, "years", false)} Years Old`}
        </p>
      </div>
    </div>
  );
};

export default AddFriend;
