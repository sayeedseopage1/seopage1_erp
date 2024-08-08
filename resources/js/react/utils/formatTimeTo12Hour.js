function formatTimeTo12Hour(time) {
    const [hours, minutes, seconds] = time.split(":");
    let date = new Date();
    date.setHours(hours, minutes, seconds);

    let hours12 = date.getHours() % 12 || 12;
    let amPm = date.getHours() >= 12 ? "PM" : "AM";
    let minutesPadded = minutes.padStart(2, "0");
    let secondsPadded = seconds.padStart(2, "0");

    return `${hours12}:${minutesPadded}:${secondsPadded} ${amPm}`;
}

export default formatTimeTo12Hour;
