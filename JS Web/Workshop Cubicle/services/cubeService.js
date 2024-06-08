// Service is the place for business logic. Not for the controllers.

import Accessory from '../models/Accessory.js';
import Cube from '../models/Cube.js';
// import cubeData from '../data/cubeData.js';    // Data layer

export default {

    async getAll(query) {
        // let cubes = cubeData.getAll();     // Data layer

        let searchExpression = {};

        // Searching logic
        if (query.search) {
            Object.assign(searchExpression, { name: new RegExp(query.search, 'i') });
        }

        if (query.from && query.to) {
            Object.assign(searchExpression, { difficultyLevel: { $gte: Number(query.from), $lte: Number(query.to) } });
        } else if (query.from) {
            Object.assign(searchExpression, { difficultyLevel: { $gte: Number(query.from) } });
        } else if (query.to) {
            Object.assign(searchExpression, { difficultyLevel: { $lte: Number(query.to) } });
        }

        return Cube
            .find(searchExpression)
            .sort({ difficultyLevel: 1 })
            .lean();    // .lean() returns cleaner raw js object
    },

    getOne(id) {
        // return Cube.getOne(id);
        // return cubeData.getOne(id);
        return Cube.findById(id).lean();
    },

    create(data, callback) {

        // TO DO: Create validatation middleware or validate incoming data in action

        let cube = new Cube(data);

        // return cubeData.create(cube);     // Data layer

        return cube.save();     // mongoose method. Save into db
    },

    async attachAccessory(cubeId, accessoryId) {
        let cube = await Cube.findById(cubeId);
        let accessory = await Accessory.findById(accessoryId).select();      // DB Projection

        cube.accessories.push(accessory);
        return cube.save();
    },

    getOneWithAccessories(cubeId) {
        return Cube
            .findById(cubeId)
            .populate('accessories')
            .lean();
    }
} 