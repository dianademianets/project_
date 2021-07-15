const { User } = require('../../database/model');

module.exports = {
    createUser: (user) => User.create(user),
    findUsers: (query) => User.find(query),
    findOneUser: (query) => User.findOne(query),
    updateOneUser: (query, updateBody) => User.updateOne(query, updateBody),
    deleteUser: (query) => User.delete(query),
}
