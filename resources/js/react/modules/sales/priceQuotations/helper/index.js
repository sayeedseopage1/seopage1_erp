export const getAseDseColor = (value) => {
  if (value <= 2000) {
      return "priceDec";
  } else if (value > 2000) {
      return "priceAse";
  }
};

export const getHourWithMin = (check) => {
  const duration = parseFloat(check);
  const getHours = parseInt(duration);
  const getMin = (duration - getHours) * 60;
  return `${getHours} Hours ${
      getMin === 0 ? "" : ` ${Math.floor(getMin)} Min`
  }`;
};