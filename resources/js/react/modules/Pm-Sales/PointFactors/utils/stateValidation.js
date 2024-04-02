import _ from "lodash";

export const emptyFieldsValidation = (data, activeFields) => {
    const emptyFields = {};
    Object.entries(data).forEach(([key, value]) => {
        if (Object.keys(activeFields).includes(key)) {
            emptyFields[key] =
                value === null ||
                value === "undefined " ||
                value === "" ||
                value === undefined ||
                (_.isObject(value) && _.isEmpty(value));
        }
    });
    return emptyFields;
};
