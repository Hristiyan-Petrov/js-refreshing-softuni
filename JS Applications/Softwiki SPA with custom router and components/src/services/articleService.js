import request from "./request.js";
import authService from './authService.js';

const subdomain = 'willingyak-eu.backendless.app';
const dataBaseEndpoint = `https://${subdomain}/api/data/Articles`;

// const applicationJsonHeaders = {
//     'Content-Type': 'application/json'
// };

const jsonHeaders = {
    'Content-Type': 'application/json',
}

const getUserHeaders = () => ({
    'user-token': authService.getData()['user-token']
})

export default {
    async create(articleBody) {
        return await request.post(dataBaseEndpoint, Object.assign(jsonHeaders, getUserHeaders()), articleBody);
    },

    async getAll() {
        console.log(Object.assign(jsonHeaders, getUserHeaders()));
        return await request.get(dataBaseEndpoint, Object.assign(jsonHeaders, getUserHeaders()));
    },

    async getOne(id) {
        return await request.get(`${dataBaseEndpoint}/${id}`, Object.assign(jsonHeaders, getUserHeaders()));
    },

    async edit(id, articleBody) {
        return await request.put(`${dataBaseEndpoint}/${id}`, jsonHeaders, articleBody);
    }
}