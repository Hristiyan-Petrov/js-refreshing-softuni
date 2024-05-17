const apiKey = 'AIzaSyB8X6MY_E3j_WaWWOhQvQVRc4w6LcCfuhE';
const dataBaseUrl = 'https://movies-dd028.firebaseio.com';
const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

// Named import 
import { request } from './requestServices.js'

// Named export
export const register = async (email, password) => {
    let response = await request(`${authUrl}signUp?key=${apiKey}`, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in localStorage
    return response;
}