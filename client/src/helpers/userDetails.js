import { isAuth } from "./auth";

export const getSender = (users) => {
  return users[0]._id === isAuth()._id ? users[1].username : users[0].username;
};

export const getSenderImage = (users) => {
  return users[0]._id === isAuth()._id
    ? users[1].userProfileImage
    : users[0].userProfileImage;
};

export const getSenderDob = (users) => {
  return users[0]._id === isAuth._id
    ? users[0].dateOfBirth
    : users[1].dateOfBirth;
};
