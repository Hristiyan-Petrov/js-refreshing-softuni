import { Router } from 'express';
import accessoryService from '../services/accessoryService.js';

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
});

router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(() => { res.redirect('/cubes') })
        .catch(err => console.log(err));
});

export default router;