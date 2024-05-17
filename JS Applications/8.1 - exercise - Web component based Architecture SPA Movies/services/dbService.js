import { request } from './requestServices.js'
const dataBaseUrl = 'https://movies-dd028.firebaseio.com';

const apiUrls = {
    allMovies: `${dataBaseUrl}/movies.json`,
};

export const getAllMovies = async (searchText) => {
    let res = await request(apiUrls.allMovies, 'GET');
    return Object.keys(res).map(key => ({ key, ...res[key] })).filter(x => !searchText || searchText === x.title); 
    // Set the movie key into the object from associative array response and filter them
}