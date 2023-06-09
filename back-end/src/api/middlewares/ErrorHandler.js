function errorHandler(error, _req, res, _next) {
  return res.status(error.statusCode || 500).json({ message: error.message });
}

module.exports = errorHandler;