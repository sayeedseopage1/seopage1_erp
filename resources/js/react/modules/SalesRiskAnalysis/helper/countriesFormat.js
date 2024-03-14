export const FormatJsonCountry = (data) => {
  let countriesList = [];
  const parsedValue = JSON.parse(data);
  parsedValue.forEach((obj) => {
    const iso = Object.keys(obj)[0];
    const name = obj[iso];
    countriesList.push({
      name: name.toUpperCase(),
      niceName: name,
      iso: iso,
    });
  });
  return countriesList;
}