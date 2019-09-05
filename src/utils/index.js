const fs = require('fs');
const isString = require('lodash/isString');
const httpReqParser = require('./../parsers/http-req-parser');

/**
 * reads the content of the file.
 * @param {String} source - req. file path
 * @returns {Promise}
 */
function getSourceContent(source) {
    return new Promise((resolve, reject) => {
        fs.readFile(source, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data.toString());
        });
    });
}

function logToConsole(data) {
    if(isString(data)){
        console.log(data.trim());
        return;
    }
    console.log(JSON.stringify(data));
}


function parseFileContents(data) {
    return new Promise((resolve, reject) => {
        const parsedReq = httpReqParser.parse(data);
        resolve(parsedReq);
    });
}

module.exports = {
    getSourceContent,
    logToConsole,
    parseFileContents
}