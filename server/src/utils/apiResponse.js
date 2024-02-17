export const apiResponse = (status, message, data) => {
  const response = {
    status: status || 200,
    message: message || "Success",
    data: data,
  };

  return response;
};
