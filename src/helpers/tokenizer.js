const jwt = require('jsonwebtoken');

const {
    config:
        {
            JWT_REFRESH, JWT_SECRET
        }
} = require('../configs');

module.exports = () => {
    const access_token = jwt.sign({},
        JWT_SECRET, { expiresIn: '20m' });
    const refresh_token = jwt.sign({},
        JWT_REFRESH, { expiresIn: '7d' });

    return {
        access_token,
        refresh_token
    };
};
