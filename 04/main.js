const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});
const lines = input.split('\n');

const passports = [];

function parsePasswords() {
    let currentPassportData = {};
    lines.forEach(line => {
        if (line === '') {
            passports.push(Object.assign({}, currentPassportData));
            currentPassportData = {};
            return;
        }
    
        const props = line.split(' ').map(x => ({
            key: x.split(':')[0],
            value: x.split(':')[1],
        }));
    
        props.forEach(prop => {
            currentPassportData[prop.key] = prop.value;
        })
    });
    passports.push(currentPassportData);
}


function getValidPassports() {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let validPassports = [];
    passports.forEach(passport => {
        for (var i = 0; i < requiredFields.length; ++i) {
            if (!(requiredFields[i] in passport)) {
                return
            }
        }

        validPassports.push(passport);
    })
    return validPassports;
}

function part2() {
    const validPassports = getValidPassports();
    return validPassports.filter(passport => {
        return isDigitsInRange(passport.byr, 1920, 2002) &&
            isDigitsInRange(passport.iyr, 2010, 2020) &&
            isDigitsInRange(passport.eyr, 2020, 2030) &&
            isValidHeight(passport.hgt) &&
            isValidHairColor(passport.hcl) &&
            isValidEyeColor(passport.ecl) &&
            isValidPid(passport.pid);
    });
}

function isDigitsInRange(value, min, max) {
    const number = parseInt(value);
    return number >= min && number <= max;
}

function isValidHeight(value) {
    const number = value.substr(0, value.length - 2);
    const unit = value.substr(value.length - 2);
    if (unit === 'cm') {
        return isDigitsInRange(number, 150, 193);
    } else if (unit === 'in') {
        return isDigitsInRange(number, 59, 76);
    }
    return false;
}

function isValidHairColor(value) {
    if (value[0] === '#') {
        const color = value.substr(1);
        if (color.length !== 6) {
            return false;
        }

        const match = color.match(/([a-f0-9]+)/g) || [''];
        return match[0].length === 6;
    }

    return false;
}

function isValidEyeColor(value) {
    return ['amb','blu','brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
}

function isValidPid(value) {
    if (value.length !== 9) {
        return false;
    }
    return (value.match(/([0-9]+)/g) || [''])[0].length === 9;
}

parsePasswords();

console.log('Part 1 answer: ' + getValidPassports().length);
console.log('Part 2 answer: ' + part2().length);