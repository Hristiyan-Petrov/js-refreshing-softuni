function commentSection(input) {

    let commentSection = {
    };

    let users = [];
    let articles = [];

    for (let line of input) {
        if (line.includes('user ')) {
            let username = line.split('user ')[1];
            users.push(username);

        } else if (line.includes('article ')) {
            let article = line.split('article ')[1];
            articles.push(article);

        } else {
            let [usernameAndArticle, titleAndComment] = line.split(': ');
            let [username, article] = usernameAndArticle.split(' posts on ');

            if (users.includes(username) && articles.includes(article)) {
                let [title, content] = titleAndComment.split(', ');
                let comment = {
                    username,
                    title,
                    content
                };

                if (!commentSection[article]) {
                    commentSection[article] = [comment];
                } else {
                    commentSection[article].push(comment);
                }

            }
        }
    }

    // Sort the articles by count of comments and print the users with their comments ordered by usernames in ascending.

    Object.entries(commentSection)
        .sort((articleA, articleB) => {
            return articleB[1].length - articleA[1].length; // number of comments for each article
        })
        .forEach((article) => {
            // let totalComments = article[1].length;
            let articleName = article[0];
            console.log(`Comments on ${articleName}`);

            Object.values(article[1]) // article[1] is coming from the first enries - on top
                .sort((commentA, commentB) => {
                    return commentA.username.localeCompare(commentB.username); // sorting by username
                })
                .forEach(comment => {
                    console.log(`--- From user ${comment.username}: ${comment.title} - ${comment.content}`);
                });
        });
}

commentSection([
    'user aUser123',
    'someUser posts on someArticle: NoTitle, stupidComment',
    'article Books',
    'article Movies',
    'article Shopping',
    'user someUser',
    'user uSeR4',
    'user lastUser',
    'uSeR4 posts on Books: I like books, I do really like them',
    'uSeR4 posts on Movies: I also like movies, I really do',
    'someUser posts on Shopping: title, I go shopping every day',
    'someUser posts on Movies: Like, I also like movies very much'
])