function getArticleGenerator(input) {
    let articles = input;
    let contentElement = document.getElementById('content');
    
    let displayArticle = function() {
        let nextArticle = document.createElement('article');
        nextArticle.textContent =  articles.shift();
        contentElement.appendChild(nextArticle);
    } 

    return () => {
        if (!articles.length) {
            return;
        }

        displayArticle();
    }

}