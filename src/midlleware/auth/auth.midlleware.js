const jwt = require('jsonwebtoken');

const {
    config: {
        JWT_SECRET, JWT_REFRESH_SECRET
    }
} = require('../../configs');
const { statusCodeEnum: statusCode, constant } = require('../../constants');
const { ErrorHandler } = require('../../helpers');
const { errorMessage } = require('../../error');
const { authService, userService } = require('../../service');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await userService.findOneUser(email);

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, RECORD_NOT_FOUND.customCode);
            }

            await passwordHash.compare(password, user.password);

            req.users = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorCodes.FORBIDDEN, errorMessages.NO_TOKEN.customCode, 'Token not valid!');
            }

            const isExistToken = await authService.findOneToken({access_token: token}, 'user_id');

            if (!isExistToken) {
                throw new ErrorHandler(errorCodes.FORBIDDEN, errorMessages.WRONG_TOKEN.customCode, 'Token not valid!');
            }

            jwt.verify(token, JWT_SECRET, (error) => {
                if (error) {
                    throw new ErrorHandler(errorCodes.UNAUTHORIZED, errorMessages.WRONG_TOKEN.customCode, 'Token not valid!');
                }
            });

            req.user = isExistToken.user_id;
            req.access_token = token;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, TOKEN_IS_REQUIRED.customCode);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.UNAUTHORIZED, WRONG_TOKEN.customCode);
                }
            });

            const tokens = await authService.findOneToken({refresh_token});

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, RECORD_NOT_FOUND.customCode);
            }

            req.refresh_token = tokens;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsForgotToken: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if (!user) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.EMAIL_NOT_VALID.customCode, 'Email not valid');
            }

            const token = await activateTokenHelper();

            await userService.updateOneUser({_id: user._id}, {forgot_token: token});

            req.user = user;
            req.forgot_token = token;
            next();
        } catch (e) {
            next(e);
        }
    }
};

