// Service is the place for business logic. Not for the controllers.

// import Cube from '../models/Cube.js';
import uniqid from 'uniqid';
// import productData from '../data/productData.js';

export default {

    getAll(query) {
        // let products = productData.getAll();     Data layer
        
        let products = Cube.getAll();

        // Searching logic
        if (query.search) {
            products = products.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
        }

        if (query.from) {
            products = products.filter(x => Number(x.difficultyLevel) >= Number(query.from));
        }

        if (query.to) {
            products = products.filter(x => Number(x.difficultyLevel) <= Number(query.to));
        }

        return products;
    },

    getOne(id) {
        return Cube.getOne(id);
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

        // return productData.create(cube);     // Data layer

        return cube.save();
    }

} 