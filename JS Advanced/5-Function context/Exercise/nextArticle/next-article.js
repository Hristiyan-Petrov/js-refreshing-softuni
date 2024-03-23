function getArticleGenerator(input) {
    let articles = input;
    let contentElement = document.getElementById('content');
    let noMoreArticles = false;

    let displayArticle = function () {
        let nextArticle = document.createElement('article');
        nextArticle.textContent = articles.shift();
        contentElement.appendChild(nextArticle);
    }

    return () => {
        if (!articles.length && !noMoreArticles) {
            let el = document.createElement('article');
            el.style.border = 'none';
            el.style.color = 'red';
            el.textContent = 'No more articles to show!';
            contentElement.appendChild(el);
            noMoreArticles = true;

            setTimeout(() => {
                contentElement.removeChild(el);
                noMoreArticles = false;
            }, 2000);

            return;
        }

        if (articles.length > 0) {
            displayArticle();
        }
    }
}