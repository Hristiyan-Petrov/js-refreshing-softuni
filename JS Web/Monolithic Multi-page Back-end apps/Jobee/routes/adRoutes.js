const router = require('express').Router();
const adController = require('../controllers/adController');
const { isAuthorized } = require('../middlewares/authGuards');
const saveCurrentViewLocals = require('../middlewares/saveCurrentViewLocals');

router.get('/', adController.getAll);

router.get('/user/:userId/applied', isAuthorized, adController.getApplied);
router.get('/user/:userId/my-ads', isAuthorized, adController.getOwn);
router.get('/new', isAuthorized, adController.showCreateForm);
router.post('/create', isAuthorized, saveCurrentViewLocals, adController.create);
router.get('/search', isAuthorized, adController.showSearchForm);
router.get('/:adId', adController.showAdDetails);
router.get('/:adId/apply', isAuthorized, adController.applyToAd);
router.get('/:adId/edit', isAuthorized, adController.showEditForm);
router.post('/:adId/edit', isAuthorized, saveCurrentViewLocals, adController.update);
router.get('/:adId/delete', isAuthorized, adController.delete);

module.exports = router;