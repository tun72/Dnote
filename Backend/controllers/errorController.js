exports.renderErrorResponse = (error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    message: error.message,
  });
};

exports.renderRouteNotFound = ( req, res, next) => {
  return res.status(404).json({
    message: "404 Not Found!",
  });
};
