import _ from "lodash";

export const emptyFieldsValidation = (data) => {
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
