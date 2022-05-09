const input = '23245';

const convertInput = (input) => {
    input = input.split('');
    input = input.map(val => +val);
    return input;
}

const getPetersLastNumber = (input) => {
    for(let i = 0; i < input.length; i++) {
        reduceNumber(input, i);
    }
    return input;
}

const reduceNumber = (input, i) => {
    while (input[i] < input[i-1]) {
        if (input[i] === 0) {
            input[i] = 9;
            for(let j = i-1; i > 0; i--) {
                if(input[j] > input[j-1]) {
                    input[j]--;
                }
            }
        } else {
            input[i]--;
        }
        console.log(input)
    }
}

console.log(getPetersLastNumber(convertInput(input)))