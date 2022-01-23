import { getSender, getSenderImage } from "../../helpers/userDetails";

const Header = ({ users }) => {
  return (
    <div className="letters-header">
      <div className="user-details">
        <h2>{getSender(users)}</h2>
        <div className="sub-details">
          <p>Country</p>
          <p>Birthdate</p>
        </div>
      </div>
      <div className="user-image">
        <img src={getSenderImage(users)} alt="profile" />
      </div>
    </div>
  );
};

export default Header;
