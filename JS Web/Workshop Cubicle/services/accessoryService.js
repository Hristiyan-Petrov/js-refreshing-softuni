import Accessory from '../models/Accessory.js';

export default {

    // TO DO: Create validatation middleware or validate incoming data in action
    create(data) {
        let cube = new Accessory(data);
        return cube.save();
    }
}