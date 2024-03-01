function createLibrary(input) {

    let library = {};

    for (let line of input) {
        if (line.includes('->')) {
            let [id, genre] = line.split(' -> ');

            if (!library[id]) {
                library[id] = {
                    genre,
                    books: []
                };
            }

        } else {
            let [title, authorAndGenre] = line.split(': ');
            let [author, genre] = authorAndGenre.split(', ');

            for (let shelf in library) {
                if (library[shelf].genre === genre) {
                    let book = {
                        title,
                        author,
                        genre
                    }
                    library[shelf].books.push(book);
                }
            }
        }
    }

    // sort and print
    // sort the shelfs by count of books in it in descending
    // then sort the books by title in ascending

    Object.entries(library)
        .sort(([shelfAid, shelfA], [shelfBid, shelfB]) => shelfB.books.length - shelfA.books.length)
        .forEach(([shelfId, shelf]) => {

            // print shelf 
            console.log(`${shelfId} ${shelf.genre}: ${shelf.books.length}`);

            // print books in shelf
            shelf.books
                .sort((bookA, bookB) => bookA.title.localeCompare(bookB.title))
                .forEach(book => {
                    console.log(`--> ${book.title}: ${book.author}`);
                });
        });
}

createLibrary([
    '1 -> history',
    '1 -> action',
    'Death in Time: Criss Bell, mystery',
    '2 -> mystery',
    '3 -> sci-fi',
    'Child of Silver: Bruce Rich, mystery',
    'Hurting Secrets: Dustin Bolt, action',
    'Future of Dawn: Aiden Rose, sci-fi',
    'Lions and Rats: Gabe Roads, history',
    '2 -> romance',
    'Effect of the Void: Shay B, romance',
    'Losing Dreams: Gail Starr, sci-fi',
    'Name of Earth: Jo Bell, sci-fi',
    'Pilots of Stone: Brook Jay, history'
]);