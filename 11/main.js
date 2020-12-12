const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const lines = input.split('\n');

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function getAdjacentSeats(grid, seatX, seatY, lookForever) {
    const adjacentSeats = [];

    for (var y = Math.max(seatY-1, 0); y <= Math.min(seatY+1, grid.length-1); ++y) {
        for (var x = Math.max(seatX-1, 0); x <= Math.min(seatX+1, grid[y].length-1); ++x) {
            if (x === seatX && y === seatY) {
                continue;
            }

            
            if (lookForever) {
                const seat = getFirstSeatSeen(grid, seatX, seatY, x - seatX, y - seatY);
                adjacentSeats.push(seat);
            } else {
                adjacentSeats.push(grid[y][x]);
            }
        }
    }

    return adjacentSeats;
}

function part1(minOccupiedSeats = 4, lookForever = false) {
    let grid = lines.slice();
    let newGrid = grid.slice();

    while (true) {
        let changed = false;

        for (var y = 0; y < grid.length; ++y) {
            for (var x = 0; x < grid[y].length; ++x) {
                const adjacents = getAdjacentSeats(grid, x, y, lookForever);
                const occupiedCount = adjacents.filter(x => x === '#').length;

                if (grid[y][x] === 'L' && occupiedCount === 0) {
                    newGrid[y] = newGrid[y].replaceAt(x, '#');
                    changed = true;
                } else if (grid[y][x] === '#' && occupiedCount >= minOccupiedSeats) {
                    newGrid[y] = newGrid[y].replaceAt(x, 'L');
                    changed = true;
                }
            }
        }

        if (!changed) {
            break;
        } else {
            grid = newGrid.slice();
            newGrid = grid.slice();
        }
    }

    let count = 0;
    for (var y = 0; y < newGrid.length; ++y) {
        for (var x = 0; x < newGrid[y].length; ++x) {
            if (newGrid[y][x] === '#') {
                count ++;
            }
        }
    }

    return count;
}

function getFirstSeatSeen(grid, seatX, seatY, dirX, dirY) {
    var x = seatX + dirX;
    var y = seatY + dirY;

    while(x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
        if (grid[y][x] === '#') {
            return '#';
        } else if (grid[y][x] === 'L') {
            return 'L';
        } else {
            x += dirX;
            y += dirY;
        }
    }

    return undefined;
}

function part2() {
    return part1(5, true);
}

console.log(part1());
console.log(part2());