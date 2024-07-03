import apiConfig from "./apiConfig"

export const getAll = () => {
    return fetch(apiConfig.posts)
        .then(res => res.json())
        .catch(err => console.log('Error from postService: ' + err));
}