function attachEvents() {
    let buttonLoad = document.getElementById('btnLoadPosts');
    let buttonView = document.getElementById('btnViewPost');
    let postsSelectElement = document.getElementById('posts');
    let postTitleElement = document.getElementById('post-title');
    let postCommentsList = document.getElementById('post-comments');



    let url = 'https://blog-apps-c12bf.firebaseio.com/posts/';

    buttonLoad.addEventListener('click', function () {

        async function loadPosts() {
            let res = await fetch(url + '.json');
            let posts = await res.json();
            return posts;
        }

        loadPosts()
            .then(posts => {
                let options = Array.from(Object.entries(posts))
                    .map(([value, body]) => {
                        return `<option value="${value}">${body.title}</option>`;
                    })
                    .join('');
                postsSelectElement.innerHTML = options;
            })
            .catch(err => {
                console.log(err);
            })

        // fetch(url + '.json')
        //     .then(res => res.json())
        //     .then(posts => {
        //         // console.log(posts);

        //         let options = Array.from(Object.entries(posts))
        //             .map(([value, body]) => {
        //                 return `<option value="${value}">${body.title}</option>`;
        //             })
        //             .join('');
        //         postsSelectElement.innerHTML = options;
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    });


    buttonView.addEventListener('click', function (e) {
        let postUrl = url + postsSelectElement.value + '/';
        let postCommentsUrl = postUrl + 'comments/';

        async function viewPost() {
            let postRes = await fetch(postUrl + '.json');
            let post = await postRes.json();

            let postCommentsRes = await fetch(postCommentsUrl + '.json');
            let comments = await postCommentsRes.json();

            return [post, comments];
        }

        viewPost()
            .then(([post, comments]) => {
                let { id, title } = post;

                let postComments = comments
                    .filter(comment => comment.postID.substring(6) === id.substring(2))
                    .map(comment => `<li>${comment.text}</li>`)
                    .join('');

                postTitleElement.textContent = title;
                postCommentsList.innerHTML = postComments;
            })
            .catch(err => {
                console.log(err);
            })



        // Promise.all([
        //     fetch(postUrl + '.json'),
        //     fetch(postCommentsUrl + '.json')
        // ])
        //     .then(responses => Promise.all(responses.map(res => res.json())))
        //     .then(res => {
        //         let [post, comments] = res;
        //         let { id, title } = post;

        //         let postComments = comments
        //             .filter(comment => comment.postID.substring(6) === id.substring(2))
        //             .map(comment => `<li>${comment.text}</li>`)
        //             .join('');

        //         postTitleElement.textContent = title;
        //         postCommentsList.innerHTML = postComments;
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

    });
}

attachEvents();