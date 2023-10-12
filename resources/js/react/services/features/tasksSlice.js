import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    tasks: [],
    subtasks: [],
    filter: null,
    reports: [],
}


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
       storeTasks: (state, action) =>{
          state.tasks = action.payload.tasks;
       },

       updateTasks: (state, action) => {
        state.tasks = _.map(state.tasks, task => task.id === action.payload.task.id ? {...task, ...action.payload.task} : task);
       },

       addSubtaskToParenttask: (state, action) => {
            state.tasks = _.map(state.tasks, t => t?.id === action.payload?.id ? action.payload?.task : t);
       },

       storeSubTasks: (state, action) => {
        state.subtasks = action.payload.subtasks;
       },

       storeReport: (state, action) => {
        state.reports = action.payload.reports;
       },

       setFilterOption: (state, action) => {
        state.filter = action.payload.filter;
       },

       updateReportStatus: (state, action) => {
        const { id, status } = action.payload;
        const reportIndex = state.reports.findIndex((r) => r.id === id);

        if (reportIndex !== -1) {
          // Update the status of the report at the found index
          state.reports[reportIndex].status = status;
        }
      }
    }
})



export const {
    storeTasks,
    setFilterOption,
    addSubtaskToParenttask,
    storeSubTasks,
    storeReport,
    updateReportStatus,
    updateTasks
} = tasksSlice.actions;
export default tasksSlice.reducer;
