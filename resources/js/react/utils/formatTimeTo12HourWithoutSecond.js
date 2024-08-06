function formatTimeTo12HourSecond(time) {
    const [hours, minutes] = time.split(":");
    let date = new Date();
    date.setHours(hours, minutes); // Set hours and minutes only

    let hours12 = date.getHours() % 12 || 12;
    let amPm = date.getHours() >= 12 ? "PM" : "AM";
    let minutesPadded = minutes.padStart(2, "0");

    return `${hours12}:${minutesPadded} ${amPm}`;
}

export default formatTimeTo12HourSecond;
