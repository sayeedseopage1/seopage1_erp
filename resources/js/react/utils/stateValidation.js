import _ from "lodash";

export const markEmptyFieldsValidation = (data) => {
    const emptyFields = {};
    Object.entries(data).forEach(([key, value]) => {
        emptyFields[key] =
            value === null ||
            value === "undefined " ||
            value === "" ||
            value === undefined ||
            (_.isObject(value) && _.isEmpty(value));
    });
    return emptyFields;
};

export const isStateAllHaveValue = (objectState) => {
    return Object.entries(objectState).some(
        ([key, value]) => value === null || value === ""
    );
};

export const isArrayObjectEmpty = (arr, skipKey) => {
    return arr.some((obj) => {
        return Object.entries(obj).some(([key, value]) => {
            if (skipKey && key === skipKey) {
                return false; // Skip this key
            }
            return value === null || value === undefined || value === "";
        });
    });
};
