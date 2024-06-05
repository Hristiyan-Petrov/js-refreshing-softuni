import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('about', {title: 'About Cubicle'});
});

export default router;