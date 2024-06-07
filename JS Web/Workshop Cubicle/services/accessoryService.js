import Accessory from '../models/Accessory.js';

export default {

    // TO DO: Create validatation middleware or validate incoming data in action
    create(data) {
        let cube = new Accessory(data);
        return cube.save();
    },

    getAllNotAttached(accessoriesObjectIdsArray) {
        return Accessory
            .find({
                '_id': { $nin: accessoriesObjectIdsArray }   // Finds accessories not in the array
            })
            .select('name')     // DB projection. Opizmizing when when working with DB. Get only the needed data
            .lean();      // .lean() returns cleaner raw js object
    }
}