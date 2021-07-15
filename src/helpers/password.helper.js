const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 9),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new Error('Wrong name or password');
        }
    }
};
