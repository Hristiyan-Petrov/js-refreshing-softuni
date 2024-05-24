// Handlebars partials loader
export async function addPartials(ctx) {
    const partials = await Promise.all([
        ctx.load('/templates/common/header.hbs'),
        ctx.load('/templates/common/footer.hbs'),
    ]);

    ctx.partials = {    // Similar to ctx.loadPartials. At the end Sammy searches for 'partials' param attached to the context
        header: partials[0],
        footer: partials[1],
    }
}

export const mapCategories = (articles) => ({
    js: articles.filter(x => x.category === 'js'),
    csharp: articles.filter(x => x.category === 'csharp'),
    java: articles.filter(x => x.category === 'java'),
    python: articles.filter(x => x.category === 'python'),
});

export const mapCurrentCategory = (category) => ({
    isCategoryJs: category === 'js',
    isCategoryCsharp: category === 'csharp',
    isCategoryPython: category === 'java',
    isCategoryJava: category === 'python',
});

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
