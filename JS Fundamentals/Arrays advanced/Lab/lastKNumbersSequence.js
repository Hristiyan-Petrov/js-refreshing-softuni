let createSequence = (length, elementsCount) => {
  let sequence = [1, 1, 2];

  // Continue generating new numbers while the sequence is not long enough
  while (sequence.length < length) {
    let nextNumber = sequence // Calculate the next number in the sequence
      .slice(-elementsCount) // Get the last 'elementsCount' numbers from the sequence
      .reduce((a, b) => a + b); // Sum up those numbers
    sequence.push(nextNumber); // Add the new number to the sequence
  }

  return sequence;
};

console.log(createSequence(8, 3));
