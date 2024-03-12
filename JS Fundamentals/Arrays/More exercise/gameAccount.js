function play(input) {
    let games = input.shift().split(' ');
    let command = input.shift().split(' ');

    while (command[0] !== 'Play!') {
        let game = command[1];

        switch (command[0]) {
            case 'Install':
                if (!games.includes(game)) {
                    games.push(game)
                }
                command = input.shift().split(' ');
                break;

            case 'Uninstall':
                if (games.includes(game)) {
                    games.splice(games.indexOf(game), 1);
                }
                command = input.shift().split(' ');
                break;

            case 'Update':
                if (games.includes(game)) {
                    games.splice(games.indexOf(game, 1), 1);
                    games.push(game);
                }
                command = input.shift().split(' ');
                break;

            case 'Expansion':
                let [original, expansion] = game.split('-');

                    // let index = games.indexOf(game);
                    // let gameExpansion = command[2];
                    // games.splice(index, 1);
                    // games.splice(index, 0, `${game}:${gameExpansion}`)

                    if (games.includes(original)) {
                        let index = games.indexOf(original);

                        let currentGame = games.slice(index, index + 1);
                        let gameExpansion = command[2];

                        games.splice(index + 1, 0, `${original}:${expansion}`)

                    }
                    command = input.shift().split(' ');
                    break;
            default:
                break;
        }

    }

    console.log(games.join(' '));
}

play(['CS WoW Diablo',
'Uninstall XCOM',
'Update PeshoGame',
'Update WoW',
'Expansion Civ-V',
'Play!']
)
