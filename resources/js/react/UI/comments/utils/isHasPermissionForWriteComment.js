import _ from "lodash";
import { User } from "./user-details"


export const isHasPermissionForWriteComment = ({assignBy, assignTo}) => {
  // console.log({assignBy,assignTo});
  const auth = new User(window.Laravel.user); 
  const isTopManagement = _.includes([1, 8], auth.getRoleId());
  const isHasPermission = _.includes([assignBy?.id, assignTo?.id], auth.getId());
 
  return isTopManagement || isHasPermission;
}