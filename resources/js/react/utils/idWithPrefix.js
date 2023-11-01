export const idWithPrefix = (id, minLength) => {
    if (id < Math.pow(10, minLength - 1)) {
        // Convert the ID to a string and pad it with leading zeros
        return id.toString().padStart(minLength, "0");
    } else {
        // If the ID is equal to or greater than the minimum length, return it as is
        return id.toString();
    }
};
