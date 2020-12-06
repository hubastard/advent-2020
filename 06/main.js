const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const groups = input.split('\n\n').map(group => {
    const peoples = group.split('\n').map(questions => ({
        questions: questions,
    }));

    let answers = {};
    peoples.forEach(person => {
        for (var i = 0; i < person.questions.length; ++i) {
            answers[person.questions[i]] = (answers[person.questions[i]] || 0) + 1;
        }
    });

    return {
        peoples,
        answers,
    };
});

function part1() {
    return groups.reduce((acc, group) => acc + Object.keys(group.answers).length, 0);
}

function part2() {
    return groups.reduce((acc, group) => {
        for (const prop in group.answers) {
            if (group.answers[prop] === group.peoples.length) {
                acc++;
            }
        }
        return acc;
    }, 0);
}

console.log('Part 1 answer: ' + part1());
console.log('Part 2 answer: ' + part2());