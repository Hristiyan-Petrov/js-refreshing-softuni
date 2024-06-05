// Service is the place for business logic. Not for the controllers.

import Cube from '../models/Cube.js';
import uniqid from 'uniqid';
import fs from 'fs';
import productsDB from '../config/productsDB.json' assert { type: 'json' };;

export default {

    getAll() {
        return productsDB;
    }, 

    getOne(id) {
        return productsDB.find(x => x.id === id);
    },

    create(data) {

        // Create model
        let cube = new Cube(
            uniqid(),
            data.name,
            data.description,
            data.imageUrl,
            data.difficultyLevel
        );

        // This should be taken out of this file. Seperation of concerns

        productsDB.push(cube);
        
        fs.writeFile('./config/productsDB.json', JSON.stringify(productsDB), (err) => {
            if (err) return console.log(err);

            
        });
    }

} 