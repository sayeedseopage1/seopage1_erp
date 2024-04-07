export const validateUrl = (url) => {
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};
