import { User } from "../utils/user-details";

// permission for timer control
export function timeControlPermision({task, status, loggedUser }){
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = new User(task?.users?.[0]);
    let _loggedUser = new User(loggedUser);
    
    // if status id 2 or 3 show timer start button
    if([2,3].includes(Number(statusId))){
        statusPermission = true;
    }

    // if task assign to 
    if(assignedUser.getId() === _loggedUser.getId()){
        assigneePermission = true;
    }  
    return statusPermission && assigneePermission;
} 


// mark as completed button permission controller
export function markAsCompletedButtonPermission({task, status, loggedUser}){
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = new User(task?.users?.[0]);
    let _loggedUser = new User(loggedUser);
    
    // if status id 2 or 3 show timer start button
    if([2,3].includes(Number(statusId))){
        statusPermission = true;
    }

    // if task assign to 
    if(assignedUser.getId() === _loggedUser.getId()){
        assigneePermission = true;
    }  
    return statusPermission && assigneePermission;
}