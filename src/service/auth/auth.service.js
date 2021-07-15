const { Token } = require('../../database/model');

module.exports = {
    findOneToken: (params, model) => Token.findOne(params).populate(model),
    createToken: (object) => Token.create(object),
    deleteToken: (params) => Token.deleteMany(params)

};
