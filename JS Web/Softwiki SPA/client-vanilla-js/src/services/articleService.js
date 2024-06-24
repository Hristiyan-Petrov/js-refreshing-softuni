import request from "./request.js";
import authService from './authService.js';

// const subdomain = 'willingyak-eu.backendless.app';
// const dataBaseEndpoint = `https://${subdomain}/api/data/Articles`;

const dataBaseEndpoint = 'http://localhost:5000/api/articles'

// const applicationJsonHeaders = {
//     'Content-Type': 'application/json'
// };

const jsonHeaders = {
    'Content-Type': 'application/json',
}

const getUserHeaders = () => ({
    // 'user-token': authService.getData()['user-token']
    'Authorization': `Bearer ${authService.getData()['user-token']}`
});

export default {
    async create(articleBody) {
        return await request.post(dataBaseEndpoint, Object.assign(jsonHeaders, getUserHeaders()), articleBody);
    },

    async getAll() {
        try {
            return await request.get(dataBaseEndpoint, Object.assign(jsonHeaders, getUserHeaders()));
        } catch (error) {
            console.log('err from artcile service: ' + error);
            throw error;
        }
    },

    async getOne(id) {
        return await request.get(`${dataBaseEndpoint}/${id}`, Object.assign(jsonHeaders, getUserHeaders()));
    },

    async edit(id, articleBody) {
        return await request.put(`${dataBaseEndpoint}/${id}`, Object.assign(jsonHeaders, getUserHeaders()), articleBody);
    },

    async delete(id) {
        return await request.delete(`${dataBaseEndpoint}/${id}`, Object.assign(jsonHeaders, getUserHeaders()));
    }
}