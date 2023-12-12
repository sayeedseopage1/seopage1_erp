import axios from 'axios';
import * as React from 'react';
import { CompareDate } from '../../utils/dateController';

const d = new CompareDate();
export const useDailySubmission = () => {
    const [isEnable, setIsEnable] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                // Fetch server time
                let response = await axios.get('/server-time-status');
                const date = response.data.data;

                // Get the current day abbreviation (e.g., 'Sat', 'Sun', 'Mon', etc.)
                const dayAbbreviation = d.dayjs(date).format('ddd');

                // Define the cutoff times
                const saturdayCutoffTime = d.dayjs(date).set('hour', 12).set('minute', 45);
                const otherDaysCutoffTime = d.dayjs(date).set('hour', 16).set('minute', 45);

                // Get the current time
                const currentTime = d.dayjs(date);

                // Check if it's Saturday or not
                if (dayAbbreviation === 'Sat') {
                    // Check if the current time is greater than 12:30 PM on Saturday
                    if (currentTime.isSameOrAfter(saturdayCutoffTime)) {
                       setIsEnable(true);
                    }else{
                        setIsEnable(false);
                    }
                } else {
                    // Check if the current time is greater than 4:30 PM on other days
                    if (currentTime.isSameOrAfter(otherDaysCutoffTime)) {
                        setIsEnable(true);
                    }else setIsEnable(false);
                }

            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return {isEnable}
}
