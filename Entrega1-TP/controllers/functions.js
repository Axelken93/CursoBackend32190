const fs = require('fs');

function readFile(fileName) {
    let fileRead = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
    return fileRead;
}

function checkId (num, path) {
    const arrayID = JSON.parse(fs.readFileSync(path, 'utf-8')).map((x) => {return x.id})
    if (arrayID.some((e) => {return e == num})) {
        return true
    } else {return false}
}

module.exports = {
    checkId,
    readFile,
};