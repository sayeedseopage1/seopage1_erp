import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: [],
    subTask: [],
    notes: [],
    timeLogs: [],
    histories: [],
    taskStatus: null, 
}

const subTaskSlice = createSlice({
    name: 'taskWiseDataTable',
    initialState,
    reducers:{
        storeTask: (state, action) => {
            state.taskStatus = action.payload?.board_column || null;
            state.task = action.payload;
        },
        storeSubTasks: (state, action) => {
            state.subTask = [...action.payload].sort((a,b) => b.id - a.id)
        },

        storeSingleSubTask: (state, action) => {
            const data = [...state.subTask, ...action.payload];
            state.subTask = data.sort((a,b) => b.id - a.id)
        },

        storeNotes: (state, action) => {
            state.notes = [...action.payload].sort((a,b) => b.id - a.id)
        },

        storeTimeLogs: (state, action) => {
            state.timeLogs = [...action.payload].sort((a,b) => b.id - a.id);
        },
        storeHistories: (state, action) => {
            state.histories = [...action.payload].sort((a,b) => b.id - a.id);
        },

        setTaskStatus: (state, action) =>{
            state.taskStatus = action.payload;
        }
    }
})

export const {storeTask, setTaskStatus, storeSingleSubTask, storeSubTasks, storeNotes, storeTimeLogs, storeHistories} = subTaskSlice.actions;
export default subTaskSlice.reducer;