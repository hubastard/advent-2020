const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});
const lines = input.split('\n');

const seatsPerRow = 8;
const lastRow = 127;

function getSeatIds() {
    const ids = [];

    lines.forEach(line => {
        const row = parseInt(line.substr(0,7).replaceAll('F', '0').replaceAll('B', '1'), 2);
        const column = parseInt(line.substr(7, 3).replaceAll('L', '0').replaceAll('R', '1'), 2)
        const seatId = row * seatsPerRow + column;
        ids.push(seatId);
    });

    return ids.sort((a, b) => a - b);
}

function part1() {
    return Math.max(...getSeatIds());
}

function part2() {
    const from = seatsPerRow;
    const to = (lastRow - seatsPerRow) * seatsPerRow;
    const seatIds = getSeatIds();
    for (var i = from; i < to; ++i) {
        if (!seatIds.includes(i) && seatIds.includes(i + 1) && seatIds.includes(i - 1)) {
            return i;
        }
    }
}

console.log('Part 1 answer: ' + part1());
console.log('Part 2 answer: ' + part2());