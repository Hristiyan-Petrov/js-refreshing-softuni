// Service is the place for business logic. Not for the controllers.

import Cube from '../models/Cube.js';
import uniqid from 'uniqid';
import productData from '../data/productData.js';
import productsDB from '../config/productsDB.json' assert { type: 'json' };

export default {

    getAll(query) {
        let result = productsDB;

        // Searching logic
        if (query.search) {
            result = result.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
        }

        if (query.from) {
            result = result.filter(x => Number(x.difficultyLevel) >= Number(query.from));
        }

        if (query.to) {
            result = result.filter(x => Number(x.difficultyLevel) <= Number(query.to));
        }

        return result;
    },

    getOne(id) {
        return productsDB.find(x => x.id === id);
    },

    create(data, callback) {

        // Create model
        let cube = new Cube(
            uniqid(),
            data.name,
            data.description,
            data.imageUrl,
            data.difficultyLevel
        );

        return productData.create(cube);
    }

} 