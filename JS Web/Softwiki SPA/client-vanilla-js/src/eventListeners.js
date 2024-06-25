import authService from "./services/authService.js";
import articleService from './services/articleService.js';
import { router } from "./router.js";
import { showNotification } from "./notification.js";

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let email = formdata.get('email');
    let password = formdata.get('password');

    authService.login(email, password)
        .then(userData => {
            console.log('logged');
            showNotification('Logged in!', 'success');
            console.log(userData);

            saveUserCredentials(userData['user-token'], userData.email, userData.objectId);
            router('/');
        })
        .catch(err => handleError(err));
};

export const onRegisterSubmit = e => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let email = formdata.get('email');
    let password = formdata.get('password');
    let rePassword = formdata.get('rep-pass');

    authService.register(email, password, rePassword)
        .then(userData => {
            console.log(userData);
            console.log('registered');
            showNotification('Registered!', 'success');

            router('/login');
        })
        .catch(err => handleError(err));
};

export const onLogout = e => {
    e?.preventDefault();

    localStorage.removeItem('auth');
    console.log('logged out');
    showNotification('Logged out!', 'success');
    router('/login');
};

export const onArticleCreateSubmit = e => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let title = formdata.get('title');
    let category = formdata.get('category');
    let content = formdata.get('content');


    articleService.create({
        title,
        category,
        content
    })
        .then(article => {
            // console.log(article);
            router('/');
        })
        .catch(err => handleError(err));
};

export const onDeleteClick = e => {
    e.preventDefault();
    let id = e.target.dataset.adticleid;
    articleService.delete(id)
        .then(res => {
            console.log(res);
            showNotification('Deleted!', 'success');
            router('/');
        })
        .catch(err => handleError(err));
};

export const onArticleEditSubmit = e => {
    e.preventDefault();

    let articleId = e.target.dataset.articleid;
    let formdata = new FormData(e.target);
    let title = formdata.get('title');
    let category = formdata.get('category');
    let content = formdata.get('content');

    articleService.edit(articleId, {
        title,
        category,
        content
    })
        .then(article => {
            console.log('edited');
            showNotification('Edited!', 'success');
            router('/');
        })
        .catch(err => handleError(err));
};

export const onBackClick = (e) => {
    e.preventDefault();

    window.onpopstate = () => {
        router(location.pathname);
    };

    history.back();
}

const saveUserCredentials = (userToken, email, uid) => {
    localStorage.setItem('auth', JSON.stringify({
        'user-token': userToken,   // For Backendless
        email,
        uid
    }));
}

const handleInvalidTokenAction = () => {
    onLogout();
    router('/login');
}

const handleError = e => {

    if (e.status && e.status === 500) {
    	router('/not-found');
    // } else if (e.status && e.status === 400) {
    // } else if (e.error.status && e.error.status === 401) {
    //     handleInvalidTokenAction();
    //     showNotification(e.error.map(e => e.message), 'error');
    } else {
        showNotification(e.error.map(e => e.msg), 'error');    // Sent from express-validator
        // console.log(e.error);
    }
}