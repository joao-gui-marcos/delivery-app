const jwt = require('jsonwebtoken');
const fs = require('fs');

const createToken = (user) => {
  const secret = fs.readFileSync('./jwt.evaluation.key');

  const jwtConfig = { algorithm: 'HS256', expiresIn: '7d' };

  const token = jwt.sign(user, secret, jwtConfig);
  
  return token;
};

const validateToken = (token) => {
  const secret = fs.readFileSync('./jwt.evaluation.key');

  const payload = jwt.verify(token, secret);

  return payload;
};

module.exports = { createToken, validateToken };