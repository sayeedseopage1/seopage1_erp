function extractTime(datetimeString) {
    // Create a new Date object from the datetime string
    const datetime = new Date(datetimeString);

    // Get the time components (hours, minutes, seconds)
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();

    // Format the time
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
}

export default extractTime;
