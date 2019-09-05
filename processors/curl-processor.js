const fs = require('fs');
const isString = require('lodash/isString');

const httpReqParser = require('./../parsers/http-req-parser');

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

function parseFileContents(data) {
    return new Promise((resolve, reject) => {
        const parsedReq = httpReqParser.parse(data);
        resolve(parsedReq);
    });
}

function convertToCurl(data) {
    return new Promise((resolve, reject) => {
        const {
            method,
            url,
            headers
        } = data;
        let curlCommand = `curl -X${method} ` +
        `${url}`;
        if(headers.length){
            curlCommand += headers.reduce( (acc, cur) => {
                return acc + ` -H "${cur.name}: ${cur.value}"`;
            }, '' );
        }
        resolve(curlCommand)
    });
}

function logToConsole(data) {
    if(isString(data)){
        console.log(data.trim());
        return;
    }
    console.log(JSON.stringify(data));
}

function curlProcessor(source) {
    // TODO: massage the file contents
    getSourceContent(source)
        .then(parseFileContents)
        .then(convertToCurl)
        .then(logToConsole)
        .catch(logToConsole);
}

module.exports = curlProcessor;