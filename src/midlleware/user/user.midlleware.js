const { responseStatusCodesEnum } = require('../../constants');
const { ErrorHandler, passwordHasher, activateTokenHelper } = require('../../helpers');
const { errorMessage } = require('../../error');
const { userService } = require('../../service');
const { userValidator } = require('../../validators');

module.exports = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.findOneUser({ email });

            if (user) {
                throw new ErrorHandler(responseStatusCodesEnum.BAD_REQUEST, errorMessage.USER_EXIST.customCode, 'User exist!');
            }
            const activate_token = activateTokenHelper();

            const newUser = {
                ...req.body,
                activate_token,
                activate_status: false
            };

            const { error } = userValidator.newUserValidator.validate(newUser);

            if (error) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.BODY_NOT_VALID.customCode, error[0].message);
            }

            req.user = newUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await userService.findOneUser(email);
            if (userByEmail) {
                throw new ErrorHandler(responseStatusCodesEnum.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsChangePassword: async (req, res, next) => {
        try {
            const { old_password, user_id } = req.body;
            console.log(req.body);

            const { error } = userValidator.editUserValidator.validate(req.body);

            console.log(error);
            if (error) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.BODY_NOT_VALID.customCode, 'Body not valid!');
            }

            const user = await userService.findOneUser({ _id: user_id })
                .select('+password');

            if (!user) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.USER_NOT_FOUND.customCode, 'User not found!');
            }

            await passwordHasher.compare(old_password, user.password);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsForgotPassword: async (req, res, next) => {
        try {
            const { forgot_token, password } = req.body;

            const user = await userService.findOneUser({ forgot_token }).select('+forgot_token');
            if (!user) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.WRONG_TOKEN.customCode, 'Forgot token not valid!');
            }

            const { error } = userValidator.editUserValidator.validate(password);

            if (error) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.BODY_NOT_VALID, 'Body not valid!');
            }

            req.user = user;
            req.forgot_token = forgot_token;
            req.password = password;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserUpdateValid: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.findOneUser({ _id: id });

            if (!user) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.USER_NOT_FOUND.customCode, 'User not Found');
            }

            const { error } = userValidator.editUserValidator.validate(req.body);

            console.log(error);
            if (error) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.BODY_NOT_VALID.customCode, 'Body not valid!');
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkLoginUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.findOneUser({ email })
                .select('+password');

            if (!user) {
                throw new ErrorHandler(
                    responseStatusCodesEnum.BAD_REQUEST, errorMessage.USER_NOT_FOUND.customCode, 'User not found!');
            }

            if (!user.activate_status) {
                throw new ErrorHandler(responseStatusCodesEnum.BAD_REQUEST,
                    errorMessage.ACCOUNT_NOT_ACTIVATE.customCode,
                    'Account not activate!');
            }

            const { error } = userValidator.editUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseStatusCodesEnum.BAD_REQUEST, errorMessage.BODY_NOT_VALID.customCode, 'Body not valid!');
            }
            await passwordHasher.compare(password, user.password);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
};
