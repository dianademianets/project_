const { authService } = require('../../service');
const { tokenizer } = require('../../helpers');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id } = req.user;

            const tokens = tokenizer();

            const userAuth = await authService.createToken({
                ...tokens,
                user_id: id
            });

            res.json(userAuth);
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const { refresh_token, user } = req;

            await authService.deleteToken({ refresh_token });

            const tokens = tokenizer();

            const userAuth = await authService.createToken({
                ...tokens,
                user_id: user._id
            });

            res.json(userAuth);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const { access_token } = req;

            await authService.deleteToken({ access_token });

            res.json('LOGOUT');
        } catch (e) {
            next(e);
        }
    }
};
