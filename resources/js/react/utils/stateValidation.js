import _ from "lodash";

export const markEmptyFieldsValidation = (data) => {
  const emptyFields = {};
  Object.entries(data).forEach(([key, value]) => {
    emptyFields[key] = value === null || value === "undefined " || value === "" || value === undefined || (_.isObject(value) && _.isEmpty(value));
  });
  return emptyFields;
};

export const isStateAllHaveValue = (objectState) => {
  return Object.entries(objectState).some(([key, value]) => value === null || value === "");
}