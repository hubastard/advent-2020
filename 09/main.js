const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const numbers = input.split('\n').map(line => parseInt(line, 10));

function part1() {
    for (var i = 25; i < numbers.length; ++i) {
        const target = numbers[i];
        const previousGroup = numbers.slice(i-25, i);
        
        let numberFound = false;
        for(var j = 0; j < previousGroup.length; ++j) {
            const lookup = target - previousGroup[j];
            if (previousGroup.includes(lookup)) {
                numberFound = true;
                break;
            }
        }

        if (!numberFound) {
            return target;
        }
    }
}

function part2() {
    const goal = part1();
    var startIndex = 0;
    var iterator = 0;
    var runningCount = 0;

    while(runningCount !== goal && iterator < numbers.length) {
        if (runningCount + numbers[iterator] < goal) {
            runningCount += numbers[iterator];
            iterator++;
        } else if (runningCount + numbers[iterator] > goal) {
            runningCount -= numbers[startIndex];
            startIndex++;
            iterator = Math.max(startIndex, iterator);
        } else {
            runningCount += numbers[iterator];
        }
    }

    if (runningCount !== goal) {
        return 'Not Found!';
    }

    const range = numbers.slice(startIndex, iterator+1);
    const min = Math.min(...range);
    const max = Math.max(...range);
    return min + max;
}

console.log(part1());
console.log(part2());