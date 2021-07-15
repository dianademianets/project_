const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
    fileDirBuilder: (fileOriginalName, itemType, ownerId, ownerType) => {
        const pathWithoutPublic = path.join(`${ownerType}`, `${ownerId}`, `${itemType}`);
        const fileDir = path.join(process.cwd(), 'public', pathWithoutPublic);
        const fileExtension = path.extname(`${fileOriginalName}`);
        const fileName = `${uuid()}${fileExtension}`;
        const finalFilePath = path.join(fileDir, fileName);

        const uploadPath = path.join(pathWithoutPublic, fileName);

        return { fileDir, finalFilePath, uploadPath };
    },

    preFindQueryHelper: (query) => {
        const {
            limit = 10, page = 1, sortBy = 'id', order = 'ASC', ...filters
        } = query;
        const offset = (page - 1) * limit;
        const keys = Object.keys(filters);
        const sort = [[
            sortBy,
            order
        ]];
        return {
            limit, offset, filters, keys, sort, page
        };
    },
};
