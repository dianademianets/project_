const { successMessages } = require('../../error');
const {
    userService, emailService, fileService, authService
} = require('../../service');
const { passwordHelper } = require('../../helpers');
const { emailActions } = require('../../constants');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const {
                user: {
                    password, activate_token, email, username
                }, avatar
            } = req;

            const passwordHash = await passwordHelper.hash(password);

            if (avatar) {
                const uploadPath = await fileService.downloadFile(avatar, FILE_FOLDER_NAME.PHOTOS, 'user');
                const avatarPath = uploadPath.split('\\')
                    .join('/');
                req.user = {
                    ...req.user,
                    avatar: avatarPath
                };
            }
            await userService.createUser({
                ...req.user,
                password: passwordHash
            });

            await emailService.sendMail(email, emailActions.ACTIVATE, {
                token: activate_token,
                name: username
            });

            res.json('Please check email!');
        } catch (e) {
            fileService.deleteFile(req.user.avatar);
            next(e);
        }
    },

    findUsers: async (req, res, next) => {
        try {
            const { query } = req;

            const users = await userService.findUsers(query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    findOneUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.findOneUser({ _id: id });

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateOneUser: async (req, res, next) => {
        try {
            const { user, avatar } = req;

            if (avatar) {
                await fileService.deleteFile(user.avatar);
                const uploadPath = await fileService.downloadFile(avatar, FILE_FOLDER_NAME.PHOTOS, 'user');
                const avatarPath = uploadPath.split('\\')
                    .join('/');
                req.body = {
                    ...req.body,
                    avatar: avatarPath
                };
            }
            await userService.updateOneUser({ _id: user._id }, req.body);
            const updateOneUser = await userService.findOneUser({ _id: user._id });

            res.json(updateOneUser);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { params: { id }, user } = req;

            await authService.deleteToken({ user_id: id });
            await userService.deleteUser({ _id: id });
            await fileService.deleteFile(user.avatar);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const { body: { new_password }, user } = req;

            const passwordHash = await passwordHelper.hash(new_password);

            await userService.updateOneUser({ _id: user._id }, { password: passwordHash });

            res.json(successMessages.UPDATE)
                .status(201);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { user, password } = req;

            const passwordHash = await passwordHelper.hash(password);

            console.log(user._id);
            console.log(passwordHash);
            await userService.updateOneUser({ _id: user._id }, {
                forgot_token: null,
                password: passwordHash
            });

            res.json(successMessages.UPDATE)
                .status(200);
        } catch (e) {
            next(e);
        }
    },

    deleteForgotToken: async (req, res, next) => {
        try {
            const { user } = req;

            await userService.updateOneUser({ _id: user._id }, { forgot_token: null });

            res.json('UPDATED').status(200);
        } catch (e) {
            next(e);
        }
    }
};

