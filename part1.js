let sample = '4.2+33-29/3+(19-1/2)+1-(89+1)';
let sample1 = '(5+8)*3/8+3';

const operations = {
  '*': (firstValue, secondValue) => +firstValue * +secondValue,
  '/': (firstValue, secondValue) => +firstValue / +secondValue,
  '+': (firstValue, secondValue) => +firstValue + +secondValue,
  '-': (firstValue, secondValue) => +firstValue - +secondValue  
}

const operators = Object.keys(operations);

const calculate = (characters) => {
  let operatorsInTerm = characters.split(/\d/);
  operatorsInTerm = operatorsInTerm.filter(val => val && val !== '.');
  let numbersInTerm = characters.split(/[+/*-]/);
  let result = 0;
  for (let i = 0; i < operatorsInTerm.length; i++) {
    if (operatorsInTerm[i] === '*' || operatorsInTerm[i] === '/') {
      result = operations[operatorsInTerm[i]](numbersInTerm[i], numbersInTerm[i+1]);
      numbersInTerm[i] = 0;
      operatorsInTerm[i] = 0;
      numbersInTerm[i+1] = result;
    }
  }
  numbersInTerm = numbersInTerm.filter(val => val !== 0);
  operatorsInTerm = operatorsInTerm.filter(val => val !== 0);
  result = 0;
  for (let i = 0; i < operatorsInTerm.length; i++) {
    result = operations[operatorsInTerm[i]](numbersInTerm[i], numbersInTerm[i+1]);
    numbersInTerm[i+1] = result;
  }
  return result;
}

const evaluate = (characters) => {
  while(characters.includes('(')) {
    let result = calculate(characters.slice(characters.indexOf('(') + 1, characters.indexOf(')')));
    characters = characters.slice(0, characters.indexOf('(')) + result + characters.slice(characters.indexOf(')') + 1);
  }
  return calculate(characters);
}

console.log(evaluate(sample));
console.log(evaluate(sample1));
  