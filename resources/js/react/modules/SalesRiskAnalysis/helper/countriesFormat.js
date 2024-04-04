export const FormatJsonCountry = (data) => {
  console.log(data);
  let countriesList = [];
  const parsedValue = JSON.parse(data);
  if(!parsedValue?.length) return;
  parsedValue?.forEach((obj) => {
    const iso = Object.keys(obj)[0];
    const name = obj[iso];
    countriesList?.push({
      name: name.toUpperCase(),
      niceName: name,
      iso: iso,
    });
  });
  return countriesList;
}

/**
  * Retrieves a value from a JSON object based on the specified type and valueType.
  * @param {Object} data - The data object containing the JSON string.
  * @param {string} type - The type of data to retrieve from the JSON object.
  * @param {string} valueType - The type of value to retrieve under the specified type.
  * @returns {*} The value corresponding to the specified type and valueType, or undefined if not found.
*/
export const getYesNoValue = (ruleData, type, valueType) => {
  if (ruleData?.type !== "yesNo") return;
  return JSON?.parse(ruleData?.value)[type][valueType];
};

