const multiplicator = (a: number, b: number, printText) => {
  console.log(printText,  a * b);
}

multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:');

type Operation = 'multiply' | 'divide' | 'add';

console.log(process.argv)