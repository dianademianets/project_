const jwt = require('jsonwebtoken');

const { jwtSecret: { JWT_ACTIVATE_SECRET } } = require('../config');

module.exports = () => jwt.sign({}, JWT_ACTIVATE_SECRET, { expiresIn: '2h' });
