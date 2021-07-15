const { Schema, model } = require('mongoose');

const { TOKEN } = require('../../constants/dataBaseTables.enum');

const tokenSchema = new Schema({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        users_id: {
            type: DataTypes.INTEGER,
            ref: USER
        }
    }, {
    timestamps: true,
        toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = model(TOKEN, tokenSchema);
