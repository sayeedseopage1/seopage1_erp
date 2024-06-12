export const getAseDseColor = (value) => {
  if (value <= 2000) {
      return "priceDec";
  } else if (value > 2000) {
      return "priceAse";
  }
};