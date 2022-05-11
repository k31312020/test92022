const inputs = ['111110', '23245', '33245', '11235888']

const convertInput = (input) => {
    input = input.split('');
    input = input.map(val => +val);
    return input;
}

const getPetersLastNumber = (input) => {
    for(let i = 0; i < input.length; i++) {
        if (input[i] > input[i+1]) {
            input[i]--;
            reduceNumber(input, i+1);
            checkPreviousDigits(input, i);
            break;
        }
    }
    return input;
}

const reduceNumber = (input, i) => {
    while (i < input.length) {
        input[i] = 9;
        i++;
    }
}

const checkPreviousDigits = (input, i) => {
    for(let j = i; j > 0; j--) {
        if (input[j-1] > input[j]) {
            input[j] = 9;
            input[j-1]--;
        }
    }
}

for(let i = 0; i < inputs.length; i++) {
    console.log(getPetersLastNumber(convertInput(inputs[i])));
}

