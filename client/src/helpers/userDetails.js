import { isAuth } from "./auth";

export const getSender = (users) => {
  return users[0]._id === isAuth()._id ? users[1].username : users[0].username;
};

export const getSenderImage = (users) => {
  return users[0]._id === isAuth()._id
    ? users[1].userProfileImage
    : users[0].userProfileImage;
};
