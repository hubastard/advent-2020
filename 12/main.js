const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});
const lines = input.split('\n');

function rotateVector(vector, angle) {
    const radian = angle * Math.PI / 180;
    const dx = vector.x;
    const dy = vector.y;
    vector.x = Math.round(dx * Math.cos(radian) - dy * Math.sin(radian));
    vector.y = Math.round(dx * Math.sin(radian) + dy * Math.cos(radian));
}

function runNavigationProgram(shipPosition, waypointDirection, moveWaypoint = false) {
    for (var i = 0; i < lines.length; ++i) {
        const cmd = lines[i].substr(0,1);
        const value = parseInt(lines[i].substr(1), 10);

        let mover = (moveWaypoint ? waypointDirection : shipPosition);

        switch(cmd) {
            case 'N':
                mover.y += value;
                break;
            case 'S':
                mover.y -= value;
                break;
            case 'E':
                mover.x += value;
                break;
            case 'W':
                mover.x -= value;
                break;
            case 'L':
                rotateVector(waypointDirection, value);
                break;
            case 'R':
                rotateVector(waypointDirection, -value);
                break;
            case 'F':
                shipPosition.x = Math.round(shipPosition.x + waypointDirection.x * value);
                shipPosition.y = Math.round(shipPosition.y + waypointDirection.y * value);
                break;
        }
    }

    return Math.abs(shipPosition.x) + Math.abs(shipPosition.y);
}

function part1() {
    return runNavigationProgram({x: 0, y: 0}, {x: 1, y: 0}, false);
}

function part2() {
    return runNavigationProgram({x: 0, y: 0}, {x: 10, y: 1}, true);
}

console.log(part1());
console.log(part2());