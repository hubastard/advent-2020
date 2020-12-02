const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const values = input.split('\n').map((line) => {
    const matches = line.match(/^([0-9]*)-([0-9]*) ([a-z]): ([a-z]*)/)
    return {
        min: parseInt(matches[1]),
        max: parseInt(matches[2]),
        letter: matches[3],
        password: matches[4],
    }
});

function part1() {
    let validPasswordCount = 0;
    values.forEach(({min, max, letter, password}) => {
        const numMatches = (password.match(new RegExp(letter, 'gi')) || []).length;
        if (numMatches >= min && numMatches <= max) {
            validPasswordCount++;
        }
    });
    return validPasswordCount;
}

function part2() {
    let validPasswordCount = 0;
    values.forEach(({min, max, letter, password}) => {
        const firstLetterValid = password[min-1] == letter;
        const secondLetterValid = password[max-1] == letter;
        if (firstLetterValid && !secondLetterValid || !firstLetterValid && secondLetterValid) {
            validPasswordCount ++;
        }
    });
    return validPasswordCount;
}

console.log('Part 1 answer: ' + part1());
console.log('Part 2 answer: ' + part2());