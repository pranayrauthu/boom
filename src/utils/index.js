const fs = require('fs');
const path = require('path');
const he = require('he');
const Mustache = require('mustache');
const isString = require('lodash/isString');
const httpReqParser = require('./../parsers/http-req-parser');

/**
 * reads the content of the file.
 * @param {String} source - req. file path
 * @returns {Promise} promise that resolves to file content
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

/**
 * parses the file along with .boom.json
 * @param {String} data - http req. message
 * @returns {Promise} promise that resolves to parsed object.
 */
function parseFileContents(data) {
    return new Promise((resolve, reject) => {
        const configPath = path.join(
            process.cwd(),
            '.boom.json'
        );
        fs.readFile(configPath, (err, configData) => {
            let rawData = data;
            if(!err && data){
                const config = JSON.parse(configData.toString());
                rawData = Mustache.render(
                    rawData,
                    config.enviroments[config.activeEnvironment]
                );
                rawData = he.decode(rawData);
            }
            const parsedReq = httpReqParser.parse(rawData);
            resolve(parsedReq);
        });        
    });
}

module.exports = {
    getSourceContent,
    logToConsole,
    parseFileContents
}