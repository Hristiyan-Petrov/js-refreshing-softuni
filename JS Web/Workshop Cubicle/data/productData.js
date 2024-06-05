import fs from 'fs/promises';
import productsDB from '../config/productsDB.json' assert { type: 'json' };

export default {
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