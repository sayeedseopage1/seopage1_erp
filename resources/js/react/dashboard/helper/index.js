import _ from "lodash";

export const  getPathNameWithoutParams = (path) => {
    return path.split("?")[0];
};


  // make query string
export const queryString = (object) => {
    const queryObject = _.pickBy(
        object,
        (value) => value !== null && value !== undefined
    );
    return new URLSearchParams(queryObject).toString();
};

// format time in hours, minutes and seconds
export function formattedTime(time) {
    const duration = moment.duration(time);
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
  
    let formattedTime = '';
  
    if (hours > 0) {
      formattedTime += `${hours} Hr `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} Min `;
    }
    if (seconds > 0) {
      formattedTime += `${seconds} Sec`;
    } 
    return formattedTime.trim() || '0';
  }