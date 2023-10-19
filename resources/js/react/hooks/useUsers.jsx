
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../services/features/usersSlice';
import { useGetAllUsersQuery } from '../services/api/userSliceApi';


export const useUsers = () => {
    const dispatch = useDispatch();
    const { users, usersObject } = useSelector(state => state.users);

    const {
        data,
        isLoading: usersIsLoading,
        isFetching: usersIsFetching,
    } = useGetAllUsersQuery('', {
        skip: users?.users?.length
    })


    React.useEffect(() => {
        if(data){
            dispatch(setUsers(data))
        }
    }, [data])


    const getUserById = (id) => {
         if(!usersObject) return;
         return usersObject[Number(id)];
    }


    return {users, usersObject, usersIsFetching ,usersIsLoading, getUserById}

}
