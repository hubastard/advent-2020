const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});
const lines = input.split('\n');

let firstRow = 0;
let lastRow = 0;
let seatIds = [];

function decode(str, lowChar, highChar, low, high) {
    for(var i = 0; i < str.length; ++i) {
        if (str[i] === lowChar) {
            high = Math.floor(high - (high - low) / 2);
        } else if (str[i] === highChar) {
            low = Math.ceil(low + (high - low) / 2);
        }
    }
    return parseInt(str[str.length-1] === lowChar ? low : high);
}

function calculateSeatIds() {
    const ids = [];
    lines.forEach(line => {
        const row = decode(line.substr(0,7), 'F', 'B', 0, 127);

        if (row < firstRow) {
            firstRow = row;
        } else if (row > lastRow) {
            lastRow = row;
        }

        const column = decode(line.substr(7, 3), 'L', 'R', 0, 7);
        const seatId = row * 8 + column;
        ids.push(seatId);
    });

    seatIds = ids.sort((a, b) => a - b);
}

function part1() {
    return Math.max(...seatIds);
}

function part2() {
    const from = (firstRow + 1) * 8;
    const to = (lastRow - 1) * 8;
    for (var i = from; i < to; ++i) {
        if (!seatIds.includes(i) && seatIds.includes(i + 1) && seatIds.includes(i - 1)) {
            return i;
        }
    }
}

calculateSeatIds();
console.log('Part 1 answer: ' + part1());
console.log('Part 2 answer: ' + part2());