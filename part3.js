const asciichart = require ('asciichart');

let sample = '(5+8x)*3/8+3+x';

let sampleXValues = [2,11,20,1.2,23,1,25,2,4];

const operations = {
  '*': (firstValue, secondValue) => +firstValue * +secondValue,
  '/': (firstValue, secondValue) => +firstValue / +secondValue,
  '+': (firstValue, secondValue) => +firstValue + +secondValue,
  '-': (firstValue, secondValue) => +firstValue - +secondValue  
}

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

const substituteX = (term, xValue) => {
    let substitutedTerm = term;
	while(substitutedTerm.includes('x')) {
    	let xIndex = substitutedTerm.indexOf('x');
      	let substitution = ['+', '-', '/', '*'].includes(substitutedTerm[xIndex-1]) ? xValue : '*' + xValue;
        substitutedTerm = substitutedTerm.slice(0, xIndex) + substitution + substitutedTerm.slice(xIndex+1);
    }
    return substitutedTerm;
}

const plotY = (term, xValues) => {
    let yValues = [];
    for(let i = 0; i < xValues.length; i++) {
        yValues.push(
            evaluate(substituteX(term, xValues[i]))
        );
    }
    return yValues;
}

console.log(asciichart.plot(plotY(sample, sampleXValues), { height: 10 }));
  