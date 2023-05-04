import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../services/slices/usersSlice';
import {  useGetAllUsersQuery, useGetUsersQuery } from '../services/api/userSliceApi';


export const useUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const {
        data,
        isLoading: usersIsLoading,
        isFetching: usersIsFetching,
    } = useGetAllUsersQuery({
        refetchOnMountOrArgChange: true,
        skip: users.length > 0
    });


    React.useEffect(() =>{
        if(data && !usersIsFetching){
            dispatch(setUsers(data));
        }
    }, [data, usersIsFetching])


    return {users, usersIsFetching ,usersIsLoading}

} 