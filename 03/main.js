const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const values = input.split('\n');
const rowWidth = values[0].length;

function countTreesOnSlope(xOffset, yOffset) {
    var x = 0;
    var y = 0;
    var count = 0;
    while(y < values.length - yOffset) {
        x += xOffset;
        y += yOffset;
        if (values[y][x % rowWidth] === '#') {
            count ++;
        } 
    }
    return count;
}

function part2() {
    return countTreesOnSlope(1,1) *
        countTreesOnSlope(3,1) *
        countTreesOnSlope(5,1) *
        countTreesOnSlope(7,1) *
        countTreesOnSlope(1,2);
}

console.log('Part 1 answer: ' + countTreesOnSlope(3, 1));
console.log('Part 2 answer: ' + part2());