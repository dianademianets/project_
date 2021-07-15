const { ErrorHandler, errorMessages, errorCodes } = require('../../error');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            const { photos } = req;

            if (photos.length > 1) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BODY_NOT_VALID.customCode, 'Body not valid!');
            }

            [req.avatar] = photos;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkFile: (req, res, next) => {
        try {
            const { files } = req;
            const photos = [];

            if (files) {
                const allFiles = Object.values(files);
                for (let i = 0; i < allFiles.length; i++) {
                    const { size, mimetype } = allFiles[i];
                    if (PHOTOS_MIMETYPES.includes(mimetype)) {
                        if (size > PHOTO_MAX_SIZE) {
                            throw new ErrorHandler(errorCodes.BAD_REQUEST, FILE_NOT_VALID.customCode, `file ${name} is too big!`);
                        }
                        photos.push(allFiles[i]);
                    }
                }
            }

            req.photos = photos;
            next();
        } catch (e) {
            next(e);
        }
    }
};
