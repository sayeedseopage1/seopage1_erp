export function generateUniqueString(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueString = '';

  while (uniqueString.length < length) {
      const randomChar = charset.charAt(Math.floor(Math.random() * charset.length));
      if (!uniqueString.includes(randomChar)) {
          uniqueString += randomChar;
      }
  }

  return uniqueString;
}

