import { User } from "../../../utils/user-details"

const currentUser = new User(window.Laravel.user);

export default function handleBtnDisable(role){
  return currentUser?.roleId !== Number(role);
};
