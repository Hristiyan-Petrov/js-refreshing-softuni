export function setUserData(data) {
    sessionStorage.setItem('auth', JSON.stringify(data));
}

export function getUserData() {
    let auth = sessionStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
}

export function getUserToken() {
    let auth = sessionStorage.getItem('auth');
    return auth ? JSON.parse(auth)['user-token'] : null;
}