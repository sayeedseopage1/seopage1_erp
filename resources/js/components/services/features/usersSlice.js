import { createSlice } from '@reduxjs/toolkit';
import * as React from 'react';



const initialState = {
    users: [],
    status: 'idle',
    error: ''
}


const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    }
});


export const { setUsers }  = usersSlice.actions;
export default usersSlice.reducer;