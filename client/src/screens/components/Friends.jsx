import { getSender, getSenderImage } from "../../helpers/userDetails";
import { ChatState } from "../../context/ChatProvider.jsx";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const Friends = ({ chats }) => {
  const { setSelectedChat, setComponent } = ChatState();

  return (
    <div className="friends-list">
      <div className="filter-wrapper">
        <div className="friends-count">
          <PeopleAltOutlinedIcon />
          <h3>Friends</h3>
          <p className="count"> </p>
        </div>
        <button className="btn">Filter</button>
      </div>
      {chats ? (
        <div className="list-wrapper">
          {chats.map((chat) => {
            return (
              <div
                onClick={() => {
                  setSelectedChat(chat);
                  setComponent("Letters");
                }}
                className="friends"
                key={chat._id}>
                <div className="friend-details">
                  <h3>{getSender(chat.users)}</h3>
                  <p>Country</p>
                </div>
                <div className="friend-image">
                  <img src={getSenderImage(chat.users)} alt="user" />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Friends;
