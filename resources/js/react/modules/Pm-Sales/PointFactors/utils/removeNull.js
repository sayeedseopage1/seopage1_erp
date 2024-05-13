export function filterNullValues(obj) {
    const filteredObj = {};
    for (const key in obj) {
        if (obj[key] !== null) {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
}
