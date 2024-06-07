import fs from 'fs/promises';

export default class DataBaseModel {
    save() {
        cubesDB.push(this);

        return fs.writeFile(
            './config/cubesDB.json',
            JSON.stringify(cubesDB)
        );
    }
}