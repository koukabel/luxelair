// // users.js
// import User from "../entities/user";

// // Static user data to replace Faker
// const usersData = [
//   {
//     firstName: "Sophie",
//     lastName: "Martin",
//     email: "sophie.martin@example.com",
//     roles: ["Traveller"],
//     hashedPassword: "test"
//   },
//   {
//     firstName: "Jean",
//     lastName: "Dupont",
//     email: "jean.dupont@example.com",
//     roles: ["Traveller"],
//     hashedPassword: "test"
//   },
//   {
//     firstName: "Marie",
//     lastName: "Bernard",
//     email: "marie.bernard@example.com",
//     roles: ["Traveller", "Host"],
//     hashedPassword: "test"
//   }
// ];

// export const generateUsers = async () => {
//   const users = [];
//   for (let i = 0; i < usersData.length; i++) {
//     const user = new User();
//     user.firstName = usersData[i].firstName;
//     user.lastName = usersData[i].lastName;
//     user.email = usersData[i].email;
//     user.roles = usersData[i].roles;
//     user.hashedPassword = usersData[i].hashedPassword;
//     users.push(user);
//   }
//   await User.save(users);
//   return users;
// };

import { faker } from "@faker-js/faker";
import User from "../entities/user";

  
const USERS_COUNT = 1;

export const generateUsers = async () => {
  const users = [];
  for (let i = 0; i <= USERS_COUNT; i++) {
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.roles = ["Traveller"];
    user.hashedPassword = "test";
    users.push(user);
  }
  await User.save(users);
  return users;
};