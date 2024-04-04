function loadCommits() {
    let username = document.getElementById('username');
    let repo = document.getElementById('repo');

    let url = `https://api.github1.com/repos/${username.value}/${repo.value}/commits`;

    let listElement = document.getElementById('commits');

    fetch(url)
        .then(res => res.json())
        .then(res => {
            let data = res.map(el => `<li id="commit">${el.commit.author.name}: ${el.commit.message}</li>`).join('');
            console.log(data);
            listElement.innerHTML = data; // Set listElement.innerHTML here in case of success
        })
        .catch(err => {
            console.log(err);
            let errMsg = `<li>Error: ${err.status} (${err.statusText})</li>`;
            // console.log(errMsg);
            listElement.innerHTML = errMsg; // Set listElement.innerHTML here in case of error
        })
        .finally(() => {
            // Do any cleanup or final actions here if needed
            console.log('Finished processing');
        });
}

// fetch(url)
// .then(res => res.json())
// .then(res => {

//     let html = res
//         .map(el => {
//             return `<li id="commit">${el.commit.author.name}: ${el.commit.message}</li>`
//             })
//         .join('');
//     listElement.innerHTML = html;

//     // console.log(html);
// })
// .catch(err => {

//     let html = `<li>Error: ${err.status} (${err.statusText})</li>`;
//     listElement.innerHTML = html;

// })