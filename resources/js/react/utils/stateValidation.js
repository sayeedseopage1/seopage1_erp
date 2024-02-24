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