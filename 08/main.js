const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const lines = input.split('\n');

function runProgram(commands) {
    let pc = 0;
    let acc = 0;
    let executedCommands = commands.map(x => 0);

    while(pc < commands.length) {
        const cmd = commands[pc].substr(0, 3);
        const value = parseInt(commands[pc].substr(4), 10);

        if (executedCommands[pc] > 0) {
            return {value: acc, success: false};
        }

        executedCommands[pc]++;

        if (cmd === 'acc') {
            acc += value;
            pc++;
        } else if (cmd === 'jmp') {
            pc += value;
        } else if (cmd === 'nop') {
            pc++;
        }
    }

    return {value: acc, success: true};
}

function part2() {
    for (var i = 0; i < lines.length; ++i) {
        const originalCmd = lines[i];
        const cmd = lines[i].substr(0, 3);
        const value = parseInt(lines[i].substr(4), 10);

        if (cmd === 'acc') {
            continue;
        }

        if (cmd === 'jmp') {
            lines[i] = 'nop ' + value;
            const result = runProgram(lines);
            if (result.success) {
                return result.value; 
            }
        } else if (cmd === 'nop') {
            lines[i] = 'jmp ' + value;
            const result = runProgram(lines);
            if (result.success) {
                return result.value; 
            }
        }
        lines[i] = originalCmd;
    }
}

console.log(runProgram(lines).value);
console.log(part2());