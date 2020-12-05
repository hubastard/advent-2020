const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});
const lines = input.split('\n');

const passports = [];

function parsePassports() {
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
        return isNumberInRange(passport.byr, 1920, 2002) &&
            isNumberInRange(passport.iyr, 2010, 2020) &&
            isNumberInRange(passport.eyr, 2020, 2030) &&
            isValidHeight(passport.hgt) &&
            isValidHairColor(passport.hcl) &&
            isValidEyeColor(passport.ecl) &&
            isValidPid(passport.pid);
    });
}

function isNumberInRange(value, min, max) {
    const number = parseInt(value);
    return number >= min && number <= max;
}

function isValidHeight(value) {
    const number = value.substr(0, value.length - 2);
    const unit = value.substr(value.length - 2);
    if (unit === 'cm') {
        return isNumberInRange(number, 150, 193);
    } else if (unit === 'in') {
        return isNumberInRange(number, 59, 76);
    }
    return false;
}

function isValidHairColor(value) {
    return !!value.match(/#([0-9a-fA-F]{6})/g);
}

function isValidEyeColor(value) {
    return ['amb','blu','brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
}

function isValidPid(value) {
    return !!value.match(/([0-9]{9})/g);
}

parsePassports();

console.log('Part 1 answer: ' + getValidPassports().length);
console.log('Part 2 answer: ' + part2().length);