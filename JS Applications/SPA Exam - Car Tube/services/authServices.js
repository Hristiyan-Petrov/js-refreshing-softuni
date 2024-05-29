const apiKey = 'AIzaSyA1tJQWHt4KC_lzVte1BTfLcELp0rx-x0M';
const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const apiUrls = {
    register: `${authUrl}signUp?key=${apiKey}`,
    login: `${authUrl}signInWithPassword?key=${apiKey}`
};

// Named import 
import { request } from './requestServices.js'

// Named export
export const register = async (email, password) => {
    let response = await request(apiUrls.register, 'POST', {
        email,
        password,
    });

    // localStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in localStorage
    return response;
}

export const login = async (email, password) => {
    let response = await request(apiUrls.login, 'POST', {
        email,
        password,
    });

    localStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in localStorage
    return response;
}

export const getUserData = () => {
    try {
        let data = JSON.parse(localStorage.getItem('auth'));

        return {
            isAuthenticated: Boolean(data.idToken),
            email: data.email,
            uid: data.localId,
            idToken: data.idToken
        };
        // Handle case when user is not logged in, cause getData() is executed on every route 
    } catch (error) {
        return {
            isAuthenticated: false,
            email: ''
        }
    }
}

export const logout = () => {
    localStorage.removeItem('auth');
} 