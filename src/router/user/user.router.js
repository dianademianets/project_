const router = require('express').Router();

const { userController } = require('../../controller');
const { userMiddleware, fileMiddleware, authMiddleware } = require('../../midlleware');

router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.checkIsUserValid,
    userController.createUser);

router.get('/:id', authMiddleware.checkAccessToken, userController.findOneUser);
router.put('/:id',
    authMiddleware.checkAccessToken,
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.isUserUpdateValid,
    userController.updateOneUser);
router.patch('/:id', authMiddleware.checkAccessToken, userMiddleware.checkIsChangePassword, userController.changePassword);
router.delete('/:id', authMiddleware.checkAccessToken, userController.deleteUser);

router.post('/forgotPassword', userMiddleware.checkIsForgotPassword, userController.forgotPassword);

router.post('/forgot', authMiddleware.checkIsForgotPassword, userController.forgotPassword);
router.post('/forgot/check', authMiddleware.checkIsForgotToken, userController.deleteForgotToken);

module.exports = router;
