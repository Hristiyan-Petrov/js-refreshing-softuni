// This module (so called Data Layer) responsibility is only to control the access to the database - retrieve and write data
// In order to relief Service module from that work.

import fs from 'fs/promises';
import productsDB from '../config/productsDB.json' assert { type: 'json' };

export default {

    getAll() {
        return productsDB;
    },

    getOne(id) {
        return productsDB.find(x => x.id === id)
    },

    create(product) {
        productsDB.push(product);

        return fs.writeFile(
            './config/productsDB.json',
            JSON.stringify(productsDB)
        );

        // Same but old school with callback 
        // fs.writeFile(
        //     './config/productsDB.json',
        //     JSON.stringify(productsDB),
        //     callback
        // );
    }
}