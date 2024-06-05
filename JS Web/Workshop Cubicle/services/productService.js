// Service is the place for business logic. Not for the controllers.

import Cube from '../models/Cube.js';
import uniqid from 'uniqid';
import fs from 'fs';
import productsDB from '../config/productsDB.json' assert { type: 'json' };;

export default {

    getAll() {
        fs.readFile('../')
    }, 

    create(data) {
        let cube = new Cube(
            uniqid(),
            data.name,
            data.description,
            data.imageUrl,
            data.difficultyLevel
        );

        productsDB.push(cube);
        
        fs.writeFile('./config/productsDB.json', JSON.stringify(productsDB), (err) => {
            if (err) return console.log(err);

            
        });
    }

} 