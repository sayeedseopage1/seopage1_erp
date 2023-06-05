export const convertTime = (time) => {
    if (time) {
        const hours = Math.floor(time / 60) || 0;
        const min = Math.floor(time % 60) || 0;

        const h = hours ? `${hours<10 ? `0${hours}`: hours} hours` : "";
        return `${h} ${min < 10 ? `0${min}`: min } min`;
    }

    return `0 min`;
};
