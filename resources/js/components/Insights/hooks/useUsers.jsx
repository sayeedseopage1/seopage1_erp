import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../services/slices/usersSlice';
import { useLazyGetAllUsersQuery } from '../services/api/userSliceApi';


export const useUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    const [
        getUsers,
        {
            data,
            isLoading: usersIsLoading,
            isFetching: usersIsFetching,
        }
    ] = useLazyGetAllUsersQuery({
        skip: users.length
    });
 


    React.useEffect(() => {
        (async () => {
            const res = await getUsers().unwrap();
            dispatch(setUsers(res));
        }) () ;
    }, []);


    const getUserById = (users,id) => {
        if(!users.users.length) return;
        return users.users.find(user =>  user.id === id);
    }


    return {users, usersIsFetching ,usersIsLoading, getUserById}

} 