const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const values = input.split('\n').map(x => parseInt(x, 10));

for (var i = 0; i < values.length; ++i) {
    for (var j = i+1; j < values.length; ++j) {
        if (values[i] + values[j] === 2020) {
            console.log(values[i] * values[j])
            break;
        }
    }
}