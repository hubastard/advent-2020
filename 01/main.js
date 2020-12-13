const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const values = input.split('\n').map(x => parseInt(x, 10));

function part1(goal) {
    const workingSet = [];
    for (var i = 0; i < values.length; ++i) {
        const diff = goal - values[i];
        if (workingSet.includes(diff)) {
            return {
                a: diff,
                b: values[i],
                result: diff * values[i]
            };
        } else {
            workingSet.push(values[i]);
        }
    }

    return undefined;
}

function part2(goal) {
    for (var i = 0; i < values.length; ++i) {
        const diff = goal - values[i];
        const result = part1(diff);

        if (result !== undefined) {
            return result.a * result.b * values[i];
        }
    }
}

console.log(part1(2020).result);
console.log(part2(2020));




