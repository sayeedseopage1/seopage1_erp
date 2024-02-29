import _ from "lodash";
import { User } from "../utils/user-details";

// * task page permission

export function singleTaskPagePermission(task, auth) {
    let hasPermission = false;
    // check is auth
    const isAuth = auth.getRoleId() === 1;
    const pmPermission = task.projectManagerId === auth.getId();
    hasPermission = true;

    return hasPermission;
}

// permission for timer control
export function timeControlPermision({ task, status, loggedUser }) {
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeTo;
    let _loggedUser = loggedUser;

    // if status id 2 or 3 show timer start button
    if ([2, 3].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (assignedUser.getId() === _loggedUser.getId()) {
        assigneePermission = true;
    }
    return (
        statusPermission && assigneePermission && _.size(task?.subtask) === 0
    );
}

// mark as completed button permission controller
export function markAsCompletedButtonPermission({ task, status, loggedUser }) {
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeTo;
    let _loggedUser = new User(loggedUser);

    // if task assign to
    if (assignedUser.getId() === _loggedUser.getId()) {
        assigneePermission = true;
        if (_loggedUser?.getRoleId() === 6) {
            if ([8].includes(Number(statusId))) {
                statusPermission = true;
            }
        } else {
            if ([2, 3].includes(Number(statusId))) {
                statusPermission = true;
            }
        }
    }

    return statusPermission && assigneePermission;
}

// approve button permission
export function approveButtonPermission({ task, status, loggedUser }) {
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeBy;
    let _loggedUser = new User(loggedUser);

    // if status id 6 show timer start button
    if ([6].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (assignedUser.getId() === _loggedUser.getId()) {
        assigneePermission = true;
    } else if (_loggedUser?.getRoleId() === 1) {
        assigneePermission = true;
    }

    return statusPermission && assigneePermission;
}

// approve button permission
export function needRevisionPermision({ task, status, loggedUser }) {
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeBy;
    let _loggedUser = new User(loggedUser);

    // if status id 6 show timer start button
    if ([6].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (assignedUser.getId() === _loggedUser.getId()) {
        assigneePermission = true;
    } else if (_loggedUser?.getRoleId() === 1) {
        assigneePermission = true;
    }

    return statusPermission && assigneePermission;
}

// revision button
export function revisionButtonPermission({ task, status, loggedUser }) {
    let statusPermission = false;
    let assigneePermission = false;

    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeTo;
    let _loggedUser = loggedUser;
    //    console.log(statusId)
    // if status id 6 show timer start button
    if ([1].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (assignedUser.getId() === _loggedUser.getId()) {
        assigneePermission = true;
    }

    return statusPermission && assigneePermission;
}

// submit for client approval button permission

export function submitForClientApproval({ task, status, auth }) {
    let statusPermission = false;
    let assigneePermission = false;
    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeBy;

    // if status id 6 show timer start button
    if ([8].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (
        (assignedUser?.getId() === auth?.getId() && auth?.getRoleId() === 4) ||
        auth?.getRoleId() === 1
    ) {
        assigneePermission = true;
    }

    return statusPermission && assigneePermission;
}

export function clientApproveConfirmationButtonPermission({
    task,
    status,
    auth,
}) {
    let statusPermission = false;
    let assigneePermission = false;
    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeBy;

    // if status id 6 show timer start button
    if ([9].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (
        (assignedUser?.getId() === auth?.getId() && auth?.getRoleId() === 4) ||
        auth?.getRoleId() === 1
    ) {
        assigneePermission = true;
    }

    return statusPermission && assigneePermission;
}

export function taskEditPermision({ task, status, auth }) {
    let statusPermission = false;
    let assigneePermission = false;
    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeBy;

    // if status id 6 show timer start button
    if ([1, 2, 3].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (assignedUser?.getId() === auth?.getId() || auth?.getRoleId() === 1) {
        assigneePermission = true;
    }

    return statusPermission && assigneePermission;
}

// sub task creation permission

export function subTaskCreationPermision({ task, status, auth }) {
    let statusPermission = false;
    let assigneePermission = false;
    let statusId = status ? status.id : -1;
    let assignedUser = task?.assigneeTo;
    let assignedBy = task?.assignedBy;

    // if status id 6 show timer start button
    if ([1, 2, 3].includes(Number(statusId))) {
        statusPermission = true;
    }

    // if task assign to
    if (
        assignedUser?.getId() === auth?.getId() ||
        (assignedBy?.getId() === auth?.getId() &&
            _.includes([5, 6, 9, 10], auth?.getRoleId()))
        // ||
        // auth?.getRoleId() === 1
    ) {
        assigneePermission = true;
    }

    return statusPermission && assigneePermission;
}
