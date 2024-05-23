// Handlebars partials loader
export async function addPartials(ctx) {
    const partials = await Promise.all([
        ctx.load('/templates/common/header.hbs'),
        ctx.load('/templates/common/footer.hbs'),        
    ]);

    ctx.partials = {
        header: partials[0],
        footer: partials[1],
    }
}

// User helpers

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
