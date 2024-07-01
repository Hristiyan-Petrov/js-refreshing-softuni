const router = require('express').Router();
const authController = require('../controllers/authController');
const saveCurrentViewLocals = require('../middlewares/saveCurrentViewLocals');
const authGuards = require('../middlewares/authGuards');

router.get('/logout', authGuards.isAuthorized, authController.logout);

router.use(authGuards.isGuest);
router.get('/register', authController.showRegister);
router.post('/register', saveCurrentViewLocals, authController.register);
router.get('/login', authController.showLogin);
router.post('/login', saveCurrentViewLocals, authController.login);

module.exports = router;