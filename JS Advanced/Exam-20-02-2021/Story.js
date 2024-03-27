class Story {
    #comments;
    #likes;
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this.#comments = [];
        this.#likes = [];
    }

    get likes() {
        let currLikesLength = this.#likes.length;
        if (currLikesLength === 0) {
            return `${this.title} has 0 likes`;
        } else if (currLikesLength === 1) {
            return `${this.#likes[0]} likes this story!`;
        } else {
            return `${this.#likes[0]} and ${currLikesLength - 1} others like this story!`;
        }
    }

    like(username) {
        if (this.#likes.includes(username)) {
            return `You can't like the same story twice!`;
        } else if (username === this.creator) {
            return `You can't like your own story!`;
        } else {
            this.#likes.push(username);
            return `${username} liked ${this.title}!`;
        }
    }

    dislike(username) {
        if (!this.#likes.includes(username)) {
            throw new Error(`You can't dislike this story!`);
            // return `You can't dislike this story!`;
        } else {
            this.#likes = this.#likes.filter(x => x !== username);
            // this.#likes = this.#likes.splice(this.#likes.indexOf(username), 1);
            `${username} disliked ${this.title}`;
            return `${username} disliked ${this.title}`;
        }
    }

    comment(username, content, id) {
        let isComment = this.#comments.find(x => x.id === id);

        if (!id || !isComment) {
            let newComment = {
                id: this.#comments.length + 1,
                username,
                content,
                replies: []
            }
            this.#comments.push(newComment);
            return `${username} commented on ${this.title}`;

        } else if (isComment) {
            let newReply = {
                id: `${isComment.id}.${isComment.replies.length + 1}`,
                username,
                content
            }
            isComment.replies.push(newReply);
            return `You replied successfully`;
        }
    }

    toString(method) {
        let sorting = null;
        switch (method) {
            case 'asc':
                sorting = (a, b) => a.id - b.id;
                break;

            case 'desc':
                sorting = (a, b) => b.id - a.id;
                break;

            case 'username':
                sorting = (a, b) => a.username.localeCompare(b.username);
                break;
        }

        // let sortedComments = this.#comments.sort(sorting);


        let result = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this.#likes.length}\nComments:`;

        if (this.#comments.length > 0) {
            this.#comments.sort(sorting).forEach(comment => {
                result += `\n-- ${comment.id}. ${comment.username}: ${comment.content}`;
                if (comment.replies.length > 0) {
                    comment.replies.sort(sorting).forEach(reply => {
                        result += `\n--- ${reply.id}. ${reply.username}: ${reply.content}`;
                    });
                }
            });
        }

        return result;
    }
}


let art = new Story("My Story", "Anny");

console.log(art.like("John"));  // "John liked My Story!");
console.log(art.likes) // "John likes this story!"
// () => art.dislike("Sally"); // "You can't dislike this story!");
console.log(art.like("Ivan"));  //"Ivan liked My Story!");
console.log(art.like("Steven"));  // "Steven liked My Story!");
console.log(art.likes)  // "John and 2 others like this story!");
console.log(art.comment("Anny", "Some Content"));  //"Anny commented on My Story");
console.log(art.comment("Ammy", "New Content", 1));  //"You replied successfully");
console.log(art.comment("Zane", "Reply", 2));  //"Zane commented on My Story");
console.log(art.comment("Jessy", "Nice :)"));  // "Jessy commented on My Story");
console.log(art.comment("SAmmy", "Reply@", 2)) // "You replied successfully");

console.log(art.toString('asc'));
`Title: My Story
Creator: Anny
Likes: 3
Comments:
-- 1. Anny: Some Content
--- 1.1. Ammy: New Content
-- 2. Zane: Reply
--- 2.1. SAmmy: Reply@
-- 3. Jessy: Nice :)`;