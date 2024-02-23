export const getColor =(percentage) => {
  if (percentage < 60) {
      return "#d50000";
  } 
  if (percentage < 80) {
      return "#FCBD01";
  } 
  return "#28a745";
}