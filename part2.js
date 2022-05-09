const input = '23245';

const convertInput = (input) => {
    input = input.split('');
    input = input.map(val => +val);
    return input;
}

const getPetersLastNumber = (input) => {
    for(let i = 1; i < input.length; i++) {
        if (input[i] < input[i-1]) {
            input[i]--;
        }
    }
    return input;
}

console.log(getPetersLastNumber(convertInput(input)))