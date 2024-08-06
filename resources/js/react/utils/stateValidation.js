import _ from "lodash";

export const markEmptyFieldsValidation = (data) => {
  const emptyFields = {};
  Object.entries(data).forEach(([key, value]) => {
    emptyFields[key] = value === null || value === "undefined " || value === "" || value === undefined || (_.isObject(value) && _.isEmpty(value));
  });
  return emptyFields;
};

export const isStateAllHaveValue = (objectState) => {
  return Object.entries(objectState).some(([key, value]) => value === null || value === "" || value === undefined || (_.isObject(value) && _.isEmpty(value)))
}

/**
 * Checks if an array of objects contains any empty or undefined values.
 * @param {Array} arr - The array of objects to check.
 * @param {Array<string>} [skipKey] - An optional array of keys to skip during the check.
 * @returns {boolean} True if any object in the array has empty or undefined values, otherwise false.
 */
export const isArrayObjectEmpty = (arr, skipKey) => {
  return arr.some(obj => {
    return Object.entries(obj).some(([key, value]) => {
      if (skipKey?.length && skipKey.includes(key)) {
        return false; // Skip this key
      }
      return value === null || value === undefined || value === "";
    });
  });
};
