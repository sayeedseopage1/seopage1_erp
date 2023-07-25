const units = ['', 'k', 'M', 'B', 'T'];


const convertNumberToUnits = (num, decimal) => {
    if(num === 0) return num;
  const exp = Math.floor(Math.log10(num) / 3);
  const result = (num / Math.pow(10, 3 * exp)).toFixed(decimal);
  return `${result}${units[exp]}`;
};


export default convertNumberToUnits