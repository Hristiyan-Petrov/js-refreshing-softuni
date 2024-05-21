import authService from "./services/authService.js";
import articleService from './services/articleService.js';
import { router } from "./router.js";

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let login = formdata.get('email');
    let password = formdata.get('password');

    authService.login(login, password)
        .then(userData => {
            console.log('logged');
            saveUserCredentials(userData['user-token'], userData.email, userData.objectId);
            router('/');
        })
};

export const onRegisterSubmit = e => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let email = formdata.get('email');
    let password = formdata.get('password');
    let rePassword = formdata.get('rep-pass');

    if (password !== rePassword) {
        console.log('passwords must match!');
        return;
    }

    authService.register(email, password)
        .then(userData => {
            console.log(userData);
            console.log('registered');

            return authService.login(userData.email, password)
        })
        .then(userData => {
            saveUserCredentials(userData['user-token'], userData.email, userData.objectId);
            router('/');
        })
};

export const onLogout = e => {
    e.preventDefault();
    authService.logout()
        .then(() => {
            localStorage.removeItem('auth');
            console.log('logged out');
            router('/login');
        })
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
        .then(articleId => {
            console.log(articleId);
            router('/');
        })
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
        router('/');
    })
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