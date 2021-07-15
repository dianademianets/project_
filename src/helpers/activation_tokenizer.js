const jwt = require('jsonwebtoken');

const {
    config:
        {
            JWT_ACTIVATION
        }
} = require('../configs');

module.exports = () => {
    const token = jwt.sign({},
        JWT_ACTIVATION, { expiresIn: '3d' });

    return token;
};
