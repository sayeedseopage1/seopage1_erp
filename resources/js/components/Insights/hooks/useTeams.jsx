import * as React from 'react';
import { useGetTeamsQuery } from '../services/api/teamSliceApi';

export const useTeams = () => {
    const [teams, setTeams] = React.useState([]);

    const {
        data,
        isFetching: isTeamsFetching,
        isError: isTeamsError,
        isLoading: isTeamsLoading,
    } = useGetTeamsQuery({
        skip: teams.length > 0,
    });



    React.useEffect(() => {
        if (data) {
            setTeams(data);
        }
    }, [data]);


    return {
        teams,
        isTeamsFetching,
        isTeamsError,
        isTeamsLoading,
    }
}