import { request } from './requestServices.js'
const dataBaseUrl = 'https://car-tube-exam-js-apps-exam-default-rtdb.firebaseio.com/cars';

// Helper functions to generate car URLs
const carUrl = (id) => `${dataBaseUrl}/${id}.json`;
const ownCarsUrl = (uid) => `${dataBaseUrl}.json?orderBy="_creator"&equalTo="${uid}"`;
const searchByYearCarsUrl = (year) => `${dataBaseUrl}.json?orderBy="year"&endAt="${year}"`;

const mapKeysToObjects = (res) => Object.keys(res).map(key => ({ key, ...res[key] }));

// API URLs
const apiUrls = {
    allCars: `${dataBaseUrl}.json`,
    oneCar: carUrl,
    ownCars: ownCarsUrl,
    searchByYearCars: searchByYearCarsUrl
};

export const getAllCars = async (searchText) => {
    let res = await request(apiUrls.allCars, 'GET');
    // Set the care key into the object from associative array response and filter them
    return mapKeysToObjects(res);
}

export const getOneCar = async (key) => await request(apiUrls.oneCar(key), 'GET');

export const addCar = async (body) => await request(apiUrls.allCars, 'POST', body);

export const editCar = async (key, body) => await request(apiUrls.oneCar(key), 'PATCH', body)

export const deleteListing = async (key) => await request(apiUrls.oneCar(key), 'DELETE');

export const getAllOwnCars = async (uid) => mapKeysToObjects(await request(apiUrls.ownCars(uid), 'GET'));

export const getSearchedCars = async (year) => mapKeysToObjects(await request(apiUrls.searchByYearCars(year), 'GET'));