import { markEmptyFieldsValidation } from "../../../utils/stateValidation";



/**
 * Validates the fields in the provided list against the current policy data validation.
 * 
 * @param {Object} listFields - The fields to be validated.
 * @param {Object} newPolicyDataValidation - The current policy data validation object.
 * @returns {Object} The updated policy data validation object after validating the fields.
 */

export const getValidFields = (listFields, newPolicyDataValidation) => {
  const fieldsValidation = markEmptyFieldsValidation(listFields);
  const prevNewPolicyDataValidation = { ...newPolicyDataValidation };
  Object.entries(fieldsValidation).forEach(([key, value]) => {
    if (Object.keys(prevNewPolicyDataValidation).includes(key)) {
      prevNewPolicyDataValidation[key] = value;
    }
  });
  return prevNewPolicyDataValidation;
}




/**
 * Updates the validation object based on the inputs data and policy type.
 * 
 * @param {Object} inputsData - The data containing input fields.
 * @param {Object} newPolicyDataValidation - The current validation object.
 * @returns {Object} The updated validation object.
 */


export const addNewRulesValidation = (inputsData, newPolicyDataValidation) => {
  switch (inputsData?.policyType?.name) {
    // less than
    case "lessThan": {
      const lessThenFields = {
        title: inputsData.title,
        valueType: inputsData.valueType,
        value: inputsData.value,
        points: inputsData.points,
        policyName: inputsData.policyName,
        department: inputsData.department,
        key: inputsData.key
      }
      const lessThenValidation = getValidFields(lessThenFields, newPolicyDataValidation);
      return lessThenValidation;
    }

    case "greaterThan": {
      const greaterThenFields = {
        title: inputsData.title,
        valueType: inputsData.valueType,
        value: inputsData.value,
        points: inputsData.points,
        policyName: inputsData.policyName,
        department: inputsData.department,
        key: inputsData.key
      }
      const greaterThenValidation = getValidFields(greaterThenFields, newPolicyDataValidation);
      return greaterThenValidation;
    }
    case "fixed": {
      const fixedFields = {
        title: inputsData.title,
        valueType: inputsData.valueType,
        value: inputsData.value,
        points: inputsData.points,
        policyName: inputsData.policyName,
        department: inputsData.department,
        key: inputsData.key
      }
      const fixedFieldsValidation = getValidFields(fixedFields, newPolicyDataValidation);
      return fixedFieldsValidation;
    }

    case "range": {
      const rangeFields = {
        title: inputsData.title,
        valueType: inputsData.valueType,
        from: inputsData.from,
        to: inputsData.to,
        points: inputsData.points,
        policyName: inputsData.policyName,
        department: inputsData.department,
        key: inputsData.key
      }
      const rangeFieldsValidation = getValidFields(rangeFields, newPolicyDataValidation);
      return rangeFieldsValidation;
    }

    case "yesNo": {
      const yesNoFields = {
        title: inputsData.title,
        yes: inputsData.yes,
        no: inputsData.no,
        policyName: inputsData.policyName,
        department: inputsData.department,
        key: inputsData.key
      }
      const yesNoFieldsValidation = getValidFields(yesNoFields, newPolicyDataValidation);
      return yesNoFieldsValidation;
    }
    case "list": {
      const listFields = {
        title: inputsData.title,
        valueType: inputsData.valueType,
        countries: inputsData.countries,
        points: inputsData.points,
        policyName: inputsData.policyName,
        department: inputsData.department,
        key: inputsData.key
      }
      const listFieldsValidation = getValidFields(listFields, newPolicyDataValidation);
      return listFieldsValidation;
    }
    case "mainDetails": {
      const mainDetailsFields = {
        policyName: inputsData.policyName,
        department: inputsData.department,
        key: inputsData.key
      }
      const mainDetailsFieldsValidation = getValidFields(mainDetailsFields, newPolicyDataValidation);
      return mainDetailsFieldsValidation;
    }

    default:
      break;
  }

}


