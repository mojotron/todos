const errorHandler = (err, req, res, next) => {
  if (err.statusCode === 400) {
  }
  return res.status(500).json({
    status: 'error',
    msg: 'we encountered internal server error, please try again later',
  });
};

export default errorHandler;
