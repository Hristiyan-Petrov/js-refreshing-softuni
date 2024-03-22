(function solution(command) {

    // Approach 1 - more complex in terms of functional programming
    const commands = {
        upvote: post => post.upvotes++,
        downvote: post => post.downvotes++,
        score: post => {
            let { upvotes, downvotes } = post;
            let result = [upvotes, downvotes];

            if (upvotes + downvotes > 50) {

                let obfuscating = (value, i, arr, votesIndex) => {      // yes, strange word - it means 'zamuglyavam' - logic from description
                    if (i === 0 || i === 1) {
                        value += Math.ceil(arr[votesIndex] * 0.25);
                    }
                };

                if (upvotes > downvotes) {
                    result[0] += Math.ceil(upvotes * 0.25);
                    result[1] += Math.ceil(upvotes * 0.25);
                } else {
                    result.forEach((value, i, arr) => {
                        if (i === 0 || i === 1) {
                            result[i] += Math.ceil(arr[1] * 0.25);
                        }
                    });
                }
            }
            // set the balance of the final post result
            result = setBalanceAndRating(result);
            return result;

            function setBalance(resultArr) {
                return resultArr.push(resultArr[0] - resultArr[1]);
            }

            function setRating(resultArr) {
                // let rating = '';
                let [upvotes, downvotes, balance] = resultArr;
                let totalVotes = upvotes + downvotes;
                let positivePercentage = (upvotes / totalVotes) * 100;

                if (totalVotes < 10) {
                    // post.rating = 'new';
                    return resultArr.push('new');
                }

                if (positivePercentage > 66) {
                    return resultArr.push('hot')
                    // rating = 'hot';
                } else if (balance >= 0 && upvotes > 100 || downvotes > 100) {
                    return resultArr.push('controversial');
                    // rating = 'controversial';
                } else if (balance < 0) {
                    return resultArr.push('unpopular');
                    // rating = 'unpopular';
                } else {
                    return resultArr.push('new');
                    // rating = 'new';
                }
            }

            function setBalanceAndRating(resultArr) {
                setBalance(resultArr);
                setRating(resultArr);
                return resultArr;
            }
        }
    }

    return {call: (post, command) => commands[post]}


    // Approach 2
    // switch (command) {
    //     case 'upvote':
    //         this.upvotes++;
    //         break;

    //     case 'downvote':
    //         this.downvotes++;
    //         break;

    //     case 'score':
    //         let result = [this.upvotes, this.downvotes];

    //         if (this.upvotes + this.downvotes > 50) {

    //             let obfuscating = (value, i, arr, votesIndex) => {      // yes, strange word - it means 'zamuglyavam' - logic from description
    //                 if (i === 0 || i === 1) {
    //                     value += Math.ceil(arr[votesIndex] * 0.25);
    //                 }
    //             };

    //             if (this.upvotes > this.downvotes) {
    //                 result[0] += Math.ceil(this.upvotes * 0.25);
    //                 result[1] += Math.ceil(this.upvotes * 0.25);

    //                 // result.forEach((value, i, arr) => {
    //                 //     if (i === 0 || i === 1 ) {
    //                 //         value += Math.ceil(arr[1] * 0.25);
    //                 //     }
    //                 // });
    //                 //          OR
    //                 // result.forEach(obfuscating(value, i, arr, 0));


    //             } else {
    //                 // result.forEach(obfuscating(value, i, arr, 1));
    //                 result.forEach((value, i, arr) => {
    //                     if (i === 0 || i === 1) {
    //                         result[i] += Math.ceil(arr[1] * 0.25);
    //                     }
    //                 });
    //             }
    //         }
    //         // set the balance of the final post result
    //         result = setBalanceAndRating(result);
    //         // console.log(result);
    //         return result;
    // }

    // function setBalance(resultArr) {
    //     return resultArr.push(resultArr[0] - resultArr[1]);
    // }

    // function setRating(resultArr) {
    //     // let rating = '';
    //     let [upvotes, downvotes, balance] = resultArr;
    //     let totalVotes = upvotes + downvotes;
    //     let positivePercentage = (upvotes / totalVotes) * 100;

    //     if (totalVotes < 10) {
    //         // post.rating = 'new';
    //         return resultArr.push('new');
    //     }

    //     if (positivePercentage > 66) {
    //         return resultArr.push('hot')
    //         // rating = 'hot';
    //     } else if (balance >= 0 && upvotes > 100 || downvotes > 100) {
    //         return resultArr.push('controversial');
    //         // rating = 'controversial';
    //     } else if (balance < 0) {
    //         return resultArr.push('unpopular');
    //         // rating = 'unpopular';
    //     } else {
    //         return resultArr.push('new');
    //         // rating = 'new';
    //     }
    // }

    // function setBalanceAndRating(resultArr) {
    //     setBalance(resultArr);
    //     setRating(resultArr);
    //     return resultArr;
    // }
})();

// testing
var forumPost = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};

solution.call(forumPost, 'upvote');
solution.call(forumPost, 'downvote');

var answer = solution.call(forumPost, 'score');
console.log(answer);

// let post = {
//     id: '3',
//     author: 'emil',
//     content: 'wazaaaaa',
//     upvotes: 100,
//     downvotes: 100
// };
// solution.call(post, 'upvote');
// solution.call(post, 'downvote');
// let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']

// for (let i = 0; i < 50; i++) {
//     solution.call(post, 'downvote');        // (executed 50 times)
// }

// score = solution.call(post, 'score');     // [139, 189, -50, 'unpopular']
// console.log(score);