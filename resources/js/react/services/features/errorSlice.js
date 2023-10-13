import { createSlice }  from '@reduxjs/toolkit';


const initialState = {
    show: false,
    code: 404,
    title: '',
    message: '',
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        showError: (state, action) => {
            state.show=action.payload.show;
            state.code = action.payload.code;
            state.title = action.payload.title;
            state.message = action.payload.message;
        }
    }
})


export const { showError } = errorSlice.actions;

export default errorSlice.reducer;
