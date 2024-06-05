import { Router } from 'express';
import uniqid from 'uniqid';
import { addCube } from './config/database.js';

const router = Router();

// GET routes

router.get('/', (req, res) => {
    res.status(200);
    res.render('index');    // Express-handlebars out of the box searches for file with that name in folder dir/views
});

router.get('/about', (req, res) => {
    res.status(200);
    res.render('about');
});

router.get('/create', (req, res) => {
    res.status(200);
    res.render('create');
});

router.get('/details/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200);
    res.render('details');
});


// POST routes

router.post('/create', (req, res) => {

    const cube = {
        id: uniqid(),
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: req.body.difficultyLevel
    }

    addCube(cube, (error) => {
        if (error) {
            res.status(500).render('error', { message: 'Failed to add cube' });
        } else {
            res.redirect('/');  // Redirect to home page after successful creation
        }
    });

    res.send(`Sucessfully added ${req.body.name}`);
});

// Middleware for handling 404 - Not Found
// MUST BE AT THE END !!!
router.use((req, res, next) => {
    res.status(404).render('404');
});

export default router;