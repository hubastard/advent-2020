const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const numbers = input.split('\n').map(line => parseInt(line, 10));

function getAdapterDiffs() {
    const sortedAdapter = numbers.sort((a, b) => a - b);
    const diffs = [];
    let rating = 0;
    for (var i = 0; i < sortedAdapter.length; ++i) {
        if (sortedAdapter[i] - rating > 3) {
            break;
        }

        diffs.push({adapter: sortedAdapter[i], diff: sortedAdapter[i] - rating});
        rating = sortedAdapter[i];
    }

    rating += 3;
    diffs.push({adapter: rating, diff: 3});

    return diffs;
}

function part1() {
    const diffs = getAdapterDiffs();
    return diffs.filter(x => x.diff === 1).length *diffs.filter(x => x.diff === 3).length ;
}

function part2() {
    const adapters = getAdapterDiffs().map(x => x.adapter);
    adapters.unshift(0);

    const numRoutes = Object.fromEntries(adapters.map(x => [x, 0]));
    numRoutes[adapters[adapters.length-1]] = 1;
    
    const reversedAdapters = [...adapters].reverse();

    for(var i = 0; i < reversedAdapters.length; ++i) {
       const adaptersInRange = adapters.filter((adapter) => adapter - reversedAdapters[i] <= 3 && adapter > reversedAdapters[i]);
       const routes = adaptersInRange.reduce((totalRoutes, adapter) => totalRoutes + numRoutes[adapter], 0);
       numRoutes[reversedAdapters[i]] += routes;
    }

    return numRoutes[0];
}

console.log(part1());
console.log(part2());