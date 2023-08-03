import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    tasks: [],
    subtasks: [],
    filter: null,
}


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
       storeTasks: (state, action) =>{
          state.tasks = action.payload.tasks;
       },

       addSubtaskToParenttask: (state, action) => {
            state.tasks = _.map(state.tasks, t => t?.id === action.payload?.id ? action.payload?.task : t);
       }
    }
})



export const { storeTasks, addSubtaskToParenttask } = tasksSlice.actions;
export default tasksSlice.reducer;