export const getWidth = (user, data) => {
  if (user?.roleId === 4) {
      return 290;
  } else if ((user?.roleId === 1 || user?.roleId === 8) && data?.extended_request_status === 1) {
      return 150;
  } else if (user?.roleId === 1 && data?.reason) {
      return 150;
  } else {
      return 150;
  }
};
