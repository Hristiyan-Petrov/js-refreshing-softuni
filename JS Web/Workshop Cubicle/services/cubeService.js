// Service is the place for business logic. Not for the controllers.

import Accessory from '../models/Accessory.js';
import Cube from '../models/Cube.js';
// import cubeData from '../data/cubeData.js';    // Data layer

export default {

    getAll(query) {
        // let cubes = cubeData.getAll();     // Data layer

        let searchExpression = {};
        let sortingExpression = {};

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

        if (query.sorting) {
            if (query.sorting === 'name') {
                sortingExpression = { name: 'asc' }
            } else {
                sortingExpression = { difficultyLevel: 1 }
            }
        }

        return Cube
            .find(searchExpression)
            .sort(sortingExpression)
            .lean();    // .lean() returns cleaner raw js object
    },

    order(ids, attr, order) {
        return Cube
            .find({ '_id': { $in: ids } }) // Finds cubes with IDs in the array
            .sort({
                [attr]: order === 'asc'
                    ? 1
                    : -1
            })
            .lean();
    },

    getOne(id) {
        // return Cube.getOne(id);
        // return cubeData.getOne(id);
        return Cube
            .findById(id)
            // .populate('creator', 'creatorId')    // replace the specified paths in the document with the entire document data from the referenced collection
            .lean();
    },

    create(data, userId) {

        // TO DO: Create validatation middleware or validate incoming data in action

        let cube = new Cube({ ...data, creator: userId });

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
    },

    editOne(id, body) {
        // return Cube.findByIdAndUpdate(id, body).lean();
        return Cube.updateOne({ _id: id, body });
        // return Cube.findOneAndUpdate({ _id: id }, body).lean()
    },

    deleteOne(id) {
        return Cube.findByIdAndDelete(id);
        // return Cube.deleteOne({ _id: id });
        // return Cube.findOneAndDelete({ _id: id });
    }
} 