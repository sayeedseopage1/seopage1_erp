import * as React from 'react';
import { useGetTeamsQuery } from '../services/api/teamSliceApi';
import { setTeams } from '../services/slices/teamSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useTeams = () => {
    const {teams, teamsObject} = useSelector(s => s.teams);
    const dispatch = useDispatch();
 
    const { 
        data,
        isFetching: isTeamsFetching,
        isError: isTeamsError,
        isLoading: isTeamsLoading,
    } = useGetTeamsQuery('', {
        skip: teams.length,
    });



    React.useEffect(() => {
        if (data) { dispatch(setTeams(data));}
    }, [data, isTeamsFetching]);


    const getTeamMembers = (team) => {
        let members = team?.members?.split(',');
        return members?.filter(m => m !== '');
    }

    return {
        teams,
        teamsObject,
        isTeamsFetching,
        isTeamsError,
        isTeamsLoading,
        getTeamMembers
    }
}