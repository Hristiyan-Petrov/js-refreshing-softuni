import fs from 'fs/promises';

export default class DataBaseModel {
    save() {
        productsDB.push(this);

        return fs.writeFile(
            './config/productsDB.json',
            JSON.stringify(productsDB)
        );
    }
}