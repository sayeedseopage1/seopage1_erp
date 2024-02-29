/**
 * Formats the error messages and optionally replaces words based on a predefined mapping object.
 * @param {Object} errors - The errors object containing error messages as arrays.
 * @param {Object} [replaceWord={}] - An optional object containing words to replace in the error messages.
 * @returns {string[]} An array of formatted error messages.
 */

export function formatAPIErrors(errors, replaceWord = {}) {
  let errorArray = [];
  for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
          const errorMessages = errors[key];
          errorMessages.forEach(errorMessage => {
              for (const replaceKey in replaceWord) {
                  if (errorMessage.includes(replaceKey)) {
                      errorMessage = errorMessage.replace(replaceKey, replaceWord[replaceKey]);
                  }
              }
              errorArray.push(errorMessage);
          });
      }
  }
  return errorArray;
}

// example usage
const errors = {
  rating: ["The rating field is required"],
  suggestion: ["The suggestion field is required"]
};
// replace the word "rating" with "Rating"
const replaceWord = {
  rating: "Rating"
};

