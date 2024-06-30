const router = require('express').Router();
const authController = require('../controllers/authController');
const attachFlashMessage = require('../middlewares/attachFlashMessage');
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');
const isAuthorized = require('../middlewares/isAuthorized');

router.get('/register', attachFlashMessage, authController.showRegister);
router.post('/register', saveCurrentAuthViewLocals, authController.register);
router.get('/login', attachFlashMessage, authController.showLogin);
router.post('/login', saveCurrentAuthViewLocals, authController.login);
router.get('/logout', authController.logout);

module.exports = router;