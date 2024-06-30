const router = require('express').Router();
const adController = require('../controllers/adController');
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');

router.get('/', adController.getAll);
router.get('/user/:userId/applied', adController.getApplied);
router.get('/user/:userId/my-ads', adController.getOwn);
router.get('/new', adController.showCreateForm);
router.post('/create', saveCurrentAuthViewLocals, adController.create);
router.get('/search', adController.showSearchForm);
router.get('/:adId', adController.showAdDetails);
router.get('/:adId/apply', adController.applyToAd);
router.get('/:adId/edit', adController.showEditForm);
router.post('/:adId/edit', saveCurrentAuthViewLocals, adController.update);
router.get('/:adId/delete', adController.delete);

module.exports = router;