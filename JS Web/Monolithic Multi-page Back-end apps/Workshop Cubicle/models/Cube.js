// import DataBaseModel from './DataBaseModel.js';      // When using Data layer
import cubesDB from '../config/cubesDB.json' assert { type: 'json' };

import mongoose from 'mongoose';

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: [50, 'Description must be 50 characters or less']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?/, 'Please use a valid Image Url']
    },
    difficultyLevel: {
        type: Number,
        required: true,
        enum: [[1, 2, 3, 4, 5, 6], 'Diffuculty must be between 1 and 6'],
        // min: [0, 'Difficulty level be at least 1'],
        // max: [6, 'Difficulty level cannot be a greater than 6']
    },
    // Relation to accessories. One cube to many accessories. Array of objects
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User', 
        // required: true
    }
});

// cubeSchema.methods
// cubeSchema.virtuals('').get(function() {this.}); 

// cubeSchema.path('difficultyLevel')      // dynamic validation
//     .validate(function() {   	
//         return this.difficultyLevel >= 1 && this.difficultyLevel <= 6
// }, 'Diffuculty must be between 1 and 6');

export default mongoose.model('Cube', cubeSchema);

// export default class Cube extends DataBaseModel {
//     constructor(id, name, description, imageUrl, difficultyLevel) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.difficultyLevel = difficultyLevel;
//     }

//     // statis method
//     static getAll() {
//         return cubesDB;
//     }

//     static getOne(id) {
//         return cubesDB.find(x => x.id === id);
//     }
// }