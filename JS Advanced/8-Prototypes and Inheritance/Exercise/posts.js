function posts() {

    // Parent Post
    let Post = function (title, content) {
        this.title = title;
        this.content = content;
    }
    Post.prototype.toString = function () {
        return `Post: ${this.title}\nContent: ${this.content}`;
    }


    //  SocialMediaPost
    let SocialMediaPost = function (title, content, likes, dislikes) {
        Post.call(this, title, content);
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = [];
    }
    Object.setPrototypeOf(SocialMediaPost, Post); // analogue of 'extends' keyword
    // addComment method
    SocialMediaPost.prototype.addComment = function (comment) {
        this.comments.push(comment);
    }
    // toString method override
    SocialMediaPost.prototype.toString = function () {
        let string = Post.prototype.toString.call(this); // get the base returnded string - analogue of super().toString
        string += `\nRating: ${this.likes - this.dislikes}`;

        if (this.comments.length > 0) {
            string += `\nComments:`;
            this.comments.forEach(com => string += `\n * ${com}`);
        }
        return string;
    }


    // BlogPost
    let BlogPost = function (title, content, views) {
        Post.call(this, title, content);
        this.views = views;
    }
    Object.setPrototypeOf(BlogPost, Post);
    BlogPost.prototype.view = function () {
        this.views++;
        return this;
    }
    BlogPost.prototype.toString = function () {
        let string = Post.prototype.toString.call(this);
        string += `\nViews: ${this.views}`;
        return string;
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}

// Test
let classes = posts();

let test = new classes.BlogPost("TestTitle", "TestContent", 5);

test.view().view().view();
console.log(test.views);

// .to.be.equal(
//     "Post: TestTitle\n" +
//     "Content: TestContent\n" +
//     "Views: 5",
//     "'BlogPost toString()' function does not return correct results");

// let classes = posts();

// let post = new classes.Post("Post", "Content");

// console.log(post.toString());

// // Post: Post
// // Content: Content

// let scm = new classes.SocialMediaPost("TestTitle", "TestContent", 25, 30);

// scm.addComment("Good post");
// scm.addComment("Very good post");
// scm.addComment("Wow!");

// console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!
