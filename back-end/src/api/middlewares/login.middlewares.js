require('dotenv/config');

const validateLoginFields = async (req, res, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email, password } = req.body;

  if (!regex.test(email) || password.length < 6) {
    return res.status(409).json({ message: 'Bad Request' });
  }

  return next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;

  if (name.length < 12) {
    return res.status(409).json({ message: 'Bad Request' });
  }

  return next();
};

const verifyAutorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
};

module.exports = {
  validateLoginFields,
  validateName,
  verifyAutorization,
};