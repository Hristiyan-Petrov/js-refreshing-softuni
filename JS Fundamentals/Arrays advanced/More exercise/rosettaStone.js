function decodeMessage(input) {
    let templateSize = Number(input.shift());
    let template = input.splice(0, templateSize).map(row => row.split(' ').map(Number));
    let message = input.map(row => row.split(' ').map(Number));
  
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
    let decodedMessage = '';
  
    for(let row = 0; row < message.length; row += templateSize) {
      for(let col = 0; col < message[0].length; col += template[0].length) {
        for(let templateRow = 0; templateRow < template.length; templateRow++) {
          for(let templateCol = 0; templateCol < template[0].length; templateCol++) {
            if(message[row + templateRow] && message[row + templateRow][col + templateCol] !== undefined) {
              let charCode = (message[row + templateRow][col + templateCol] + template[templateRow][templateCol]) % 27;
              decodedMessage += alphabet[charCode];
            }
          }
        }
      }
    }
  
    console.log(decodedMessage);
  }
  
  decodeMessage([
    '2',
    '59 36',
    '82 52',
    '4 18 25 19 8',
    '4 2 8 2 18',
    '23 14 22 0 22',
    '2 17 13 19 20',
    '0 9 0 22 22'
   ]);