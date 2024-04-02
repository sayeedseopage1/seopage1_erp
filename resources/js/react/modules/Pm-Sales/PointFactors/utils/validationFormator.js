import { emptyFieldsValidation } from "./stateValidation";

export const validationFormator = (
    mainState,
    activeFields,
    validationState
) => {
    const fieldsValidation = emptyFieldsValidation(mainState, activeFields);

    const prevNewPolicyDataValidation = { ...validationState };
    Object.entries(fieldsValidation).forEach(([key, value]) => {
        if (Object.keys(prevNewPolicyDataValidation).includes(key)) {
            prevNewPolicyDataValidation[key] = value;
        }
    });

    return prevNewPolicyDataValidation;
};
