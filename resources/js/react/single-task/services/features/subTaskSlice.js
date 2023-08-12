import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: [],
    subTask: [],
    notes: [],
    timeLogs: [],
    histories: [],
    taskStatus: null,
    lessTrackModalFor: '',
    lessTrackModal: false,
    lessTrackDate: '',
    timerRunningTime: 0,
    isTimerRunning: false,
    isWorkingEnvironmentSubmit: undefined,
};

const subTaskSlice = createSlice({
    name: "taskWiseDataTable",
    initialState,
    reducers: {
        storeTask: (state, action) => {
            state.taskStatus = action.payload?.board_column || null;
            state.task = action.payload;
        },
        storeSubTasks: (state, action) => {
            state.subTask = [...action.payload].sort((a, b) => b.id - a.id);
        },

        storeSingleSubTask: (state, action) => {
            const data = [...state.subTask, ...action.payload];
            state.subTask = data.sort((a, b) => b.id - a.id);
        },

        storeNotes: (state, action) => {
            state.notes = [...action.payload].sort((a, b) => b.id - a.id);
        },

        storeTimeLogs: (state, action) => {
            state.timeLogs = [...action.payload].sort((a, b) => b.id - a.id);
        },
        storeHistories: (state, action) => {
            state.histories = [...action.payload].sort((a, b) => b.id - a.id);
        },

        setTaskStatus: (state, action) => {
            state.taskStatus = action.payload;
        },

        setTimerStatus: (state, action) => {
            state.timerRunningTime = action.payload.time;
            state.isTimerRunning = action.payload.isTimerRunning;
        },

        // set less track a day modal
        setLessTrackModal: (state, action) => {
            state.lessTrackModal = action.payload.show;
            state.lessTrackModalFor = action.payload.type;
            state.lessTrackDate = action.payload.date
        },

        // set working environment sumbition
        setWorkingEnvironmentStatus: (state, action) => {
            state.isWorkingEnvironmentSubmit = action.payload;
        }
    },
});

export const {
    storeTask,
    setTaskStatus,
    storeSingleSubTask,
    storeSubTasks,
    storeNotes,
    storeTimeLogs,
    storeHistories,
    setLessTrackModal,
    setTimerStatus,
    setWorkingEnvironmentStatus
} = subTaskSlice.actions;
export default subTaskSlice.reducer;
