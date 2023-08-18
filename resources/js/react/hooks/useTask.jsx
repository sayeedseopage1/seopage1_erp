import * as React from 'react';
import _ from 'lodash';
import { useApproveSubmittedTaskMutation, useLazyGetTaskDetailsQuery } from '../services/api/SingleTaskPageApi';
import { User } from '../utils/user-details';

export const useSingleTask = () => {
    const auth = new User(window?.Laravel?.user);


    /* ********************************** */
    /* ********* Approved Task ********* */
    const [
        getTaskDetails,
        {isFetching: taskDetailsIsFetching}
    ] = useLazyGetTaskDetailsQuery();
    

    /* ********************************** */
    /* ********* Approved Task ********* */
    const [
        approveSubmittedTask, 
        {isLoading: approveTaskLoadingStatus}
    ] = useApproveSubmittedTaskMutation();
    
    const approveTask = async (data, callback) => {

        if(!data || _.isEmpty(data)) return;
        try{
            const res = approveSubmittedTask(data).unwrap();

            if(res){
                callback(); 
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
        }catch(err){
            console.log(err)
        }
    }


    return {
        approveTask,
        approveTaskLoadingStatus,
    }
}