export const markEmptyFieldsValidation = (data) => {
  const emptyFields = {};
  Object.entries(data).forEach(([key, value]) => {
    emptyFields[key] = value === null || value === "";
  });
  return emptyFields;
};

export const isStateAllHaveValue = (objectState) => {
  return Object.entries(objectState).some(([key, value]) => value === null || value === "");
}


/**
 * Validates the fields in the provided list against the current policy data validation.
 * 
 * @param {Object} listFields - The fields to be validated.
 * @param {Object} newPolicyDataValidation - The current policy data validation object.
 * @returns {Object} The updated policy data validation object after validating the fields.
 */

export const getValidFields = (listFields, stateDataValidation) => {
  const fieldsValidation = markEmptyFieldsValidation(listFields);
  const prevStateDataValidation = { ...stateDataValidation };
  Object.entries(fieldsValidation).forEach(([key, value]) => {
    if (Object.keys(prevStateDataValidation).includes(key)) {
      prevStateDataValidation[key] = value;
    }
  });
  return prevStateDataValidation;
}

