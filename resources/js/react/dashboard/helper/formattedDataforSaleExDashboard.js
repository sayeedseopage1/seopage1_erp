import { formattedTime } from ".";

export const formattedDataForSaleExDashboard = (data, key) => {
  switch (key) {
    case "average_bidding_delay_time":
      return formattedTime(data);
    default:
      return data;
  }
}