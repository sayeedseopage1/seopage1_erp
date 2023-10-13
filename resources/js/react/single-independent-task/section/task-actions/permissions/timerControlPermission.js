// permission for timer control
export function timeControlPermision({task, status, loggedUser }){
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = new User(task?.users?.[0]);
    let _loggedUser = new User(loggedUser);
    
    if([1,2,3].includes(Number(statusId))){
        statusPermission = true;
    }


    if(assignedUser.getId() === _loggedUser.getId()){
        assigneePermission = true;
    }  
    return statusPermission && assigneePermission;
} 
// permission for timer control
export function timeControlPermision({task, status, loggedUser }){
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = new User(task?.users?.[0]);
    let _loggedUser = new User(loggedUser);
    
    if([1,2,3].includes(Number(statusId))){
        statusPermission = true;
    }


    if(assignedUser.getId() === _loggedUser.getId()){
        assigneePermission = true;
    }  
    return statusPermission && assigneePermission;
} 
