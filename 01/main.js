const fs = require('fs');
const { mainModule } = require('process');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const values = input.split('\n').map(x => parseInt(x, 10));

for (var i = 0; i < values.length; ++i) {
    for (var j = 0; j < values.length; ++j) {
        if (i != j && values[i] + values[j] === 2020) {
            console.log(values[i] * values[j])
            break;
        }
    }
}

