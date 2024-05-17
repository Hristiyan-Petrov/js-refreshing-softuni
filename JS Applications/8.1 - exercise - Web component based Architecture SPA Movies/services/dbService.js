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

export const getOneMovie = async (key) => {
    let res = await request(dataBaseUrl + `/movies/${key}.json`, 'GET');

    return res;

    // return {
    //     ...res,
    //     isCreator: res.creator === authService.getUserId(),
    //     isLiked: res.likes ? Boolean(res.likes.includes(authService.getUserId())) : false,
    //     likesNumber: res.likes ? res.likes.length : false
    // };
}