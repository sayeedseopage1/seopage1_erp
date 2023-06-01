import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../services/slices/usersSlice';
import { useGetAllUsersQuery, useLazyGetAllUsersQuery } from '../services/api/userSliceApi';


export const useUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    // const [
    //     getUsers,
    //     {
    //         isLoading: usersIsLoading,
    //         isFetching: usersIsFetching,
    //     }
    // ] = useLazyGetAllUsersQuery({
    //     skip: users?.users?.length
    // });
  

    // React.useEffect(() => {
    //     if(users.length && usersIsFetching) return;
    //     (async () => {
    //         const res = await getUsers().unwrap();
    //         dispatch(setUsers(res));
    //     }) () ;
    // }, []);

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


    const getUserById = (users,id) => {
        if(!users.users.length) return;
        return users.users.find(user =>  user.id === id);
    }


    return {users,usersObjects: users?.usersObjects,  usersIsFetching ,usersIsLoading, getUserById}

} 