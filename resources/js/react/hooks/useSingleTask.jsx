import * as React from 'react';
import _ from 'lodash';
import { 
    useApproveSubmittedTaskMutation, 
    useLazyGetSubmittedTaskQuery, 
    useLazyGetTaskDetailsQuery 
} from '../services/api/SingleTaskPageApi';
import { User } from '../utils/user-details';

export const useSingleTask = () => {
    const auth = new User(window?.Laravel?.user);


    /* ********************************** */
    /* ********* Get Task by task ID ********* */
    const [
        getTaskDetails,
        {isFetching: taskDetailsIsFetching}
    ] = useLazyGetTaskDetailsQuery();

    const getTaskById = async (taskId) => {
        try{
            const res = await getTaskDetails(`/${taskId}/json?mode=basic`).unwrap();
            if(res){
                const task = {
                    ...res.task,
                    parent_task_action: res.parent_task_action,
                    parent_task_title: res.parent_task_heading?.heading || null,
                    working_environment: res.working_environment,
                    working_environment_data: res.working_environment_data,
                    pm_task_guideline: res.task_guideline,
                    task_revisions: res.revisions,
                    taskSubTask: res.Sub_Tasks,
                }
                return task; 
            }
        }catch(err) {
            console.log(err)
        }
    }


     /* *************************************************** */
    /* ********* Get Task submittion Information ********* */

    const [getSubmittedTask, {isFetching: submittionInfoIsFetching} ] = useLazyGetSubmittedTaskQuery();

    // method
    const getSubmittionInfo = async (taskId) => {
        try{
            const res = await getSubmittedTask(taskId).unwrap();
            if(res){
                let data = _.orderBy(res, ['task_id', 'submission_no'], ['desc', 'desc']); 
                return data;
            } 
        }catch(err) {
            console.log(err)
        }
    }
     

    /* ********************************** */
    /* ********* Approved Task ********* */
    const [
        approveSubmittedTask, 
        {isLoading: approveTaskLoadingStatus}
    ] = useApproveSubmittedTaskMutation();
    
    // method
    const approveTask = async (data, callback) => {
        if(!data || _.isEmpty(data)) return;
        try{
            const res = await approveSubmittedTask(data).unwrap();

            if(res){
                callback &&callback(); 
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
                
                Toast.fire({
                    icon: 'success',
                    title: 'Task Approved Successfully'
                })
            }
        }catch(err){ console.log(err) }
    }


    return {
        getTaskById,
        approveTask,
        getSubmittionInfo,
        taskDetailsIsFetching,
        approveTaskLoadingStatus,
        submittionInfoIsFetching
    }
}