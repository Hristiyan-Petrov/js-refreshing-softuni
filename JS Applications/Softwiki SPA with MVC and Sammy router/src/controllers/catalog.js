// Responsible for rendering articles

import { createArticle, getAllArticles } from "../data.js";
import { addPartials, mapCategories } from "../helpers.js";

export async function homePage() {
    await addPartials(this);

    const context = {};

    if (this.app.userData) {
        context.user = this.app.userData;    // this.app is the App context from Sammy features. Other contextes are Event and ?Render?
    } else {
        this.redirect('/login');
        return;
    }

    this.partials.articleItem = await this.load('../../templates/catalog/articleItem.hbs');

    Object.assign(context, mapCategories(await getAllArticles()))

    this.partial('/templates/catalog/homePage.hbs', context);
}

export async function createPage() {
    await addPartials(this);

    const context = {
        user: this.app.userData    // this.app is the App context from Sammy features. Other contextes are Event and ?Render?
    };

    this.partial('/templates/catalog/createPage.hbs', context);
}

export async function createPost(ctx) {
    const { title, category, content } = (ctx.params);

    if (title.length === 0 || category.length === 0 || content.length === 0) {
        throw new Error('All fields must have value!');
    }

    createArticle({
        title,
        category,
        content
    })
        .then(res => {
            ctx.redirect('/home');
        })
        .catch(err => {
            console.log('Error from catch');
            throw new Error(err);
        });
}