function manageMovies(input) {

    let movies = [];
    const movieAttributes = 3;

    for (let command of input) {
        if (command.split(' ').includes('addMovie')) {

            let currMovie = {
                name: command.split('addMovie')[1].trim()
            }

            movies.push(currMovie)

        } else if (command.split(' ').includes('directedBy')) {
            let [currMovie, director] = command.split('directedBy').map(x => x.trim());

            for (let movie of movies) {
                // console.log(currMovie);
                // console.log(movie.name);
                // console.log(currMovie === movie.name);

                if (currMovie === movie.name) {
                    movie.director = director;
                    break;
                }
            }

        } else if (command.split(' ').includes('onDate')) {
            let [currMovie, date] = command.split('onDate').map(x => x.trim());

            for (let movie of movies) {
                if (currMovie === movie.name) {
                    movie.date = date;
                    break;
                }
            }
        }
    }

    for (let movie of movies) {
        if (Object.keys(movie).length === movieAttributes) {
            console.log(JSON.stringify(movie));
        }
    }

}

manageMovies([
    'addMovie The Avengers',
    'addMovie Superman',
    'The Avengers directedBy Anthony Russo',
    'The Avengers onDate 30.07.2010',
    'Captain America onDate 30.07.2010',
    'Captain America directedBy Joe Russo'
]
);