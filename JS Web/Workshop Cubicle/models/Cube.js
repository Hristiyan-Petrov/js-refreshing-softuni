import DataBaseModel from './DataBaseModel.js';
import productsDB from '../config/productsDB.json' assert { type: 'json' };

export default class Cube extends DataBaseModel {
    constructor(id, name, description, imageUrl, difficultyLevel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }

    // statis method
    static getAll() {
        return productsDB;
    }

    static getOne(id) {
        return productsDB.find(x => x.id === id);
    }
}