import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import WeekOfYear from "dayjs/plugin/weekOfYear";

export const getPeriod = ({setPeriod, startDate, endDate, frequency, defaultValue=""}) => {
    dayjs.extend(utc);
    dayjs.extend(quarterOfYear);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(WeekOfYear);

     const yearly = () => {
            let years = [];
            const yearStart = dayjs(startDate).startOf("year");
            const yearEnd = dayjs(endDate).endOf("year");
            let current = yearStart;

            while (current <= yearEnd) {
                years.push({
                    title: `${current.format("YYYY")}`,
                    start: dayjs(startDate).format(),
                    end: dayjs(endDate).format(),
                    value: defaultValue
                });
                current = dayjs(current).add(1, "year");
            }

            if(setPeriod) {
                setPeriod([...years]);
            } else {
                return years;
            }
        };

        // quarterly
        const quarterly = () => {
            let quarters = [];
            const qs = dayjs(startDate).startOf("quarter");
            const qe = dayjs(endDate).endOf("quarter");

            let curr = qs;
            while (curr <= qe) {
                const quarterNumber = dayjs(curr).quarter(); // number of quarter
                let quarterStart = dayjs(curr).format(); // get first date of a quarter start
                let quarterEnd = dayjs(curr)
                    .quarter(quarterNumber)
                    .endOf("quarter")
                    .format(); // get last date of a quarter end

                /*
                 ** if quarter start date less then or equal
                 ** duration start date then start date is duration start date
                 ** else start date is quarter start date
                 */
                quarterStart = dayjs(quarterStart).isSameOrBefore(startDate)
                    ? dayjs(startDate).format()
                    : quarterStart;

                /*
                 ** if duration end date less then or equal
                 ** duration end date then end date is duration end date
                 ** else end date is quarter end date
                 */
                quarterEnd = dayjs(endDate).isSameOrBefore(quarterEnd)
                    ? dayjs(endDate).format()
                    : quarterEnd;

                // create title for period
                const title = `Q${quarterNumber} (${dayjs(quarterStart).format(
                    `MMM DD`
                )} - ${dayjs(quarterEnd).format("MMM DD")}, ${dayjs(
                    quarterEnd
                ).format("YYYY")})`;

                // push quarters
                quarters.push({
                    quarterNumber,
                    title,
                    start: quarterStart,
                    end: quarterEnd,
                    value: defaultValue
                });

                curr = dayjs(curr).add(1, "quarter");
            }

            if(setPeriod) {
                setPeriod([...quarters]);
            }else{
                return quarters;
            } 
        };

        // divide by month
        const monthly = () => {
            const months = [];
            const ms = dayjs(startDate).startOf("month");
            const me = dayjs(endDate).endOf("month");

            let curr = ms;

            while (curr <= me) {
                let monthStartDay = dayjs(curr).format();
                let monthEndDay = dayjs(curr).endOf("month").format();

                /*
                 ** if monthStartDay less then or equal
                 ** duration start date then return duration start
                 ** else return monthStartDay
                 */

                monthStartDay = dayjs(monthStartDay).isSameOrBefore(
                    startDate
                )
                    ? dayjs(startDate).format()
                    : monthStartDay;

                /*
                 ** if duration end less then or equal
                 ** monthEndDay date then return duration end
                 ** else return monthEndDay
                 */

                monthEndDay = dayjs(endDate).isSameOrBefore(monthEndDay)
                    ? dayjs(endDate).format()
                    : monthEndDay;

                // push month
                months.push({
                    title: dayjs(curr).format("MMM YYYY"),
                    start: monthStartDay,
                    end: monthEndDay,
                    value: defaultValue
                });

                curr = dayjs(curr).add(1, "month");
            }

            if(setPeriod) {
                setPeriod([...months]);
            } else {
                return months;
            }
        };

        // weekly
        const weekly = () => {
            const weeks = [];
            const ws = dayjs(startDate).startOf("week");
            const we = dayjs(endDate).endOf("week");

            let curr = ws;
            while (curr <= we) {
                const weekNumber = dayjs(curr).week();
                let weekStart = dayjs(curr).format();
                let weekEnd = dayjs(curr).endOf("week").format();

                /*
                 ** if week start less then or equal
                 ** duration start then return duration start
                 ** else return week start
                 */
                weekStart = dayjs(weekStart).isSameOrBefore(startDate)
                    ? dayjs(startDate).format()
                    : weekStart;

                /*
                 ** if duration end less then or equal
                 ** week end then return duration end
                 ** else return week end
                 */
                weekEnd = dayjs(endDate).isSameOrBefore(weekEnd)
                    ? dayjs(endDate).format()
                    : weekEnd;

                // title
                const title = `Week ${weekNumber} (${dayjs(weekStart).format(
                    "MMM DD"
                )} - ${dayjs(weekEnd).format("MMM DD")}, ${dayjs(
                    weekEnd
                ).format("YYYY")})`;

                // push
                weeks.push({
                    title,
                    start: weekStart,
                    end: weekEnd,
                    value: defaultValue
                });

                curr = dayjs(curr).add(1, "week");
            }

            if(setPeriod) {
                setPeriod([...weeks]);
            } else {
                return weeks;
            }
        };



        
        if (_.toLower(frequency) === "monthly") {
            return monthly();
        } else if (_.toLower(frequency) === "quarterly") {
            return quarterly();
        } else if (_.toLower(frequency) === "yearly") {
            return yearly();
        } else if (_.toLower(frequency) === "weekly") {
            return weekly();
        } 
        
    return;

}