const { Op } = require('sequelize');

module.exports = {

    fileUpdateObjectBuilder: (uploadPath, itemType) => ({ [itemType]: uploadPath }),

    userFilterObjectBuilder: (filters, keys) => {
        const filterObject = {};

        keys.forEach((key) => {
            switch (key) {
                case 'age_GTE':
                    filterObject.age = Object.assign({}, filterObject.age, { [Op.gte]: +filters.age_GTE });
                    break;
                case 'age_LTE':
                    filterObject.age = Object.assign({}, filterObject.age, { [Op.lte]: +filters.age_LTE });
                    break;
                case 'first_name':
                    filterObject.first_name = { [Op.like]: `%${filters.first_name}%` };
                    break;
                case 'last_name':
                    filterObject.last_name = { [Op.like]: `%${filters.last_name}%` };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        return filterObject;
    },
};
