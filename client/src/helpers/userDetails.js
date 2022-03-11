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
  return users[0]._id === isAuth()._id
    ? users[1].dateOfBirth
    : users[0].dateOfBirth;
};

export const getSenderCountry = (users) => {
  if (users[0].location && users[1].location) {
    return users[0]._id === isAuth()._id
      ? users[0].location.features[0].properties.country
      : users[1].location.features[0].properties.country;
  }
  return "";
};

// export const getSendDate = (users) => {
//   let user1 = {
//     lat: users[0].location.features[0].geometry.coordinates[0],
//     lon: users[0].location.features[0].geometry.coordinates[1],
//   };

//   let user2 = {
//     lat: users[1].location.features[0].geometry.coordinates[0],
//     lon: users[1].location.features[0].geometry.coordinates[1],
//   };

//   let distance = geodist(user1, user2, { exact: true, unit: "km" });

//   let date = moment();

//   if (distance <= 100) {
//     return moment(date).add(5, "minutes").toArray();
//   } else {
//     return moment(date)
//       .add(distance * 3, "minutes")
//       .toArray();
//   }
// };
