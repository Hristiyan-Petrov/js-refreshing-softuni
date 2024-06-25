// This module (so called Data Layer) responsibility is only to control the access to the database - retrieve and write data
// In order to relief Service module from that work.

import fs from 'fs/promises';
import cubesDB from '../config/cubesDB.json' assert { type: 'json' };

export default {

    getAll() {
        return cubesDB;
    },

    getOne(id) {
        return cubesDB.find(x => x.id === id)
    },

    create(cube) {
        cubesDB.push(cube);

        return fs.writeFile(
            './config/cubesDB.json',
            JSON.stringify(cubesDB)
        );

        // Same but old school with callback 
        // fs.writeFile(
        //     './config/cubesDB.json',
        //     JSON.stringify(cubesDB),
        //     callback
        // );
    }
}