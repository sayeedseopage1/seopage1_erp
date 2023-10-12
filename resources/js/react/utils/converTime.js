export const convertTime = (time) => {
    if (time) {
        // check if time less then 0
        const prefix = time < 0 ? '- ' : ''

        const hours = Math.floor(Math.abs(time) / 60) || 0;
        const min = Math.floor(Math.abs(time) % 60) || 0;

        const h = hours ? `${hours<10 ? `0${hours}`: hours} hours` : "";
        return `${prefix}${h} ${min < 10 ? `0${min}`: min } min`;
    }

    return `0 min`;
};
