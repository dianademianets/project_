const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
    createFile: async (file, docName, itemType, itemId) => {
        const pathWithoutStatic = path.join('files', `${itemId}`, itemType);
        const fileDir = path.join(process.cwd(), 'static', pathWithoutStatic);

        const fileExtension = docName.split('.').pop();
        const nameFile = `${uuid()}.${fileExtension}`;

        const finalPath = path.join(fileDir, nameFile);
        const uploadPath = path.join(pathWithoutStatic, nameFile);

        await fs.mkdir(fileDir, { recursive: true });
        await file.mv(finalPath);

        return uploadPath;
    }
};
