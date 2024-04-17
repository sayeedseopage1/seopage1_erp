import { emptyFieldsValidation } from "./stateValidation";

export const validationFormator = (mainState, validationState) => {
    const fieldsValidation = emptyFieldsValidation(mainState);

    const prevNewPolicyDataValidation = { ...validationState };
    Object.entries(fieldsValidation).forEach(([key, value]) => {
        if (Object.keys(prevNewPolicyDataValidation).includes(key)) {
            prevNewPolicyDataValidation[key] = value;
        }
    });

    return prevNewPolicyDataValidation;
};
