import { getUserData } from './authServices.js';
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

    // This should not be done here. dbServices should only retrieve data. 
    // return {
    //     ...res,
    //     isCreator: res.creator === authService.getUserId(),
    //     isLiked: res.likes ? Boolean(res.likes.includes(authService.getUserId())) : false,
    //     likesNumber: res.likes ? res.likes.length : 0
    // };
}

export const addMovie = async (body) => {
    return await request(apiUrls.allMovies, 'POST', body);
}

export const likeMovie = async (key, uid) => {
    let movieData = await request(dataBaseUrl + `/movies/${key}.json`, 'GET');
    const userId = getUserData().uid; // Get current user's id

    if (!movieData.likes) {
        movieData.likes = [userId]; // If 'likes' attribute does not exist, initialize it as an empty array
    } else {
        movieData.likes.push(userId); // Push the current userId to the 'likes' array
    }

    // Send a PATCH request to update the movie data (PUT will also work)
    return await request(dataBaseUrl + `/movies/${key}.json`, 'PATCH', movieData);

    // TO DO: create better likeMovie flow. Like this down but it changes the DB 'likes' structure
    // return await request(dataBaseUrl + `/movies/${key}/likes.json`, 'POST', { uid });
}