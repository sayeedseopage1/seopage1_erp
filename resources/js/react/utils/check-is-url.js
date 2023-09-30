 export const checkIsURL = (url) => { 
    const urlRegex = /^(?:ftp|http|https):\/\/(?:www\.)?[^\s]+$/;
    return typeof url === 'string' && urlRegex.test(url);
}