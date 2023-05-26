import { createSlice }  from '@reduxjs/toolkit';

const initialState = {
    teams: [],
    teamsObject: {},
}


const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams: (state, action) => {
            state.teams = action.payload;
            state.teamsObject = action.payload?.reduce((acc, curr) => {
               acc[curr.id] = curr;
               return acc;
            }, {})
        }
    }
})



export const { setTeams } = teamSlice.actions;

export default teamSlice.reducer;