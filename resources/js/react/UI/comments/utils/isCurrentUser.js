import { User } from "./user-details";

const currentUser = new User(window.Laravel.user);

export default function isCurrentUser(user_id){
  return currentUser.id === Number(user_id);
  // return Number(2) === Number(user_id);
}