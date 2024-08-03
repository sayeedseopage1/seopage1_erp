function FormatTime(isoDate) {
    if (isoDate) {
        const dateObject = new Date(isoDate);

        let hour = dateObject.getHours();
        const minute = addLeadingZero(dateObject.getMinutes());
        const second = addLeadingZero(dateObject.getSeconds());

        // Determine if it's AM or PM
        const meridiem = hour >= 12 ? "PM" : "AM";

        // Convert hour to 12-hour format
        hour = hour % 12 || 12;

        const formattedTime = `${hour}:${minute}:${second} ${meridiem}`;

        return formattedTime;
    } else {
        return null;
    }
}

// Function to add leading zeros
const addLeadingZero = (value) => {
    return value < 10 ? "0" + value : value;
};

export default FormatTime;
