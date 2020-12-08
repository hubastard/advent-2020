const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const lines = input.split('\n');

let bags = {};
lines.forEach(line => {
    const type = line.match(/^([a-z]+ [a-z]+)/)[1];
    const content = (line.match(/([0-9])+ ([a-z]+ [a-z]+)/g) || [])
        .map(bag => ({
            type: bag.match(/([a-z]+ [a-z]+)+/)[1],
            count: parseInt(bag.match(/([0-9])+/)[1])
        }));
    bags[type] = content;
});

function part1() {
    function getBagsTypesInside(bagType) {
        let results = [];
        bags[bagType].forEach(bag => {
            results.push(bag.type);
            results.push(...getBagsTypesInside(bag.type));
        });
        return results;
    }

    let count = 0;
    Object.keys(bags).forEach(bagType => {
        const value = getBagsTypesInside(bagType);
        if (value.includes('shiny gold')) {
            count++;
        }
    });
    return count;
}

function part2() {
    function countBagsInside(bagType) {
        let count = 0;
        bags[bagType].forEach(bag => {
            count += bag.count * countBagsInside(bag.type) + bag.count;
        });
        return count;
    }

    return countBagsInside('shiny gold');
}

console.log(part1());
console.log(part2());