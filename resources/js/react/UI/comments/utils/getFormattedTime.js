import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

export default function getFormattedTime(time) {
  dayjs.extend(isSameOrAfter);
  const current_time = dayjs();
  const target_time = dayjs(time);

  if (target_time.isSame(current_time, "day")) {
    return `Today ${target_time.format("hh:mm A")}`;
  }
  else if (target_time.isSame(current_time.subtract(1, "day"), "day")) {
    return `Yesterday, ${target_time.format("hh:mm A")}`;
  }
  else if (target_time.isSameOrAfter(current_time.subtract(6, "day"), "day")) {
    return `${target_time.format("dddd, hh:mm A")}`;
  }
  else {
    return `${target_time.format("MMM DD, YYYY, hh:mm A")}`;
  }
};


export function checkSameDay(target_date, given_date){
  dayjs.extend(isSameOrAfter);
  return given_date.isSame(target_date, "day");
} 