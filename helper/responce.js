exports.responseSuccess = async (
  res,
  message,
  data = null,
) => {
  return res.status(200).json({
    status: 200,
    message,
    data,
  });
};

exports.responseError = async (
  res,
  message,
  status
) => {
  return res.status(400).json({
    status: status,
    message,
  });
};
