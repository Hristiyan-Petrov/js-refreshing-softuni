// Service is the place for business logic. Not for the controllers.

import Cube from '../models/Cube.js';
// import cubeData from '../data/cubeData.js';    // Data layer

export default {

    async getAll(query) {
        // let cubes = cubeData.getAll();     // Data layer
        // let cubes = Cube.getAll();
        let cubes = await Cube.find({}).lean();      // .lean() returns cleaner raw js object

        // Searching logic
        if (query.search) {
            cubes = cubes.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
        }

        if (query.from) {
            cubes = cubes.filter(x => Number(x.difficultyLevel) >= Number(query.from));
        }

        if (query.to) {
            cubes = cubes.filter(x => Number(x.difficultyLevel) <= Number(query.to));
        }

        return cubes;
    },

    getOne(id) {
        // return Cube.getOne(id);
        // return cubeData.getOne(id);
        return Cube.findById(id).lean(); 
    },

    create(data, callback) {

        // Create model
        let cube = new Cube(data);

        // return cubeData.create(cube);     // Data layer

        return cube.save();     // mongoose method. Save into db
    }

} 