function solve(input) {
    class Song {
        constructor(typeList, name, time) {
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

    let songsNumber = input.shift();
    let desiredType = input.pop();

    // let songs = [];

    input
        .map(line => {
            let [typeList, name, time] = line.split('_');
            let song = new Song(typeList, name, time);
            return song;
        })
        .filter(song => {
            if (desiredType === 'all') {
                return song
            } else if (song.typeList === desiredType) {
                return song;
            }
        })
        .forEach(song => {
            console.log(song.name);
        });

    // 

}

solve([3,
    'favourite_DownTown_3:14',
    'favourite_Kiss_4:16',
    'favourite_Smooth Criminal_4:01',
    'favourite']


)