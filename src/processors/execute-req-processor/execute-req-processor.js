const axios = require('axios');
const {
    getSourceContent,
    logToConsole,
    parseFileContents
} = require('./../../utils');

function makeRequest(req) {
    return new Promise((resolve, reject) => {
        axios({
            method: req.method,
            url: req.url,
            data: req.body,
            headers: req.headers.reduce((acc, cur) => {
                const { name, value } = cur;
                acc[name] = value;
                return acc;
            }, {})
        }).then(function (resp) {
            resolve(resp.data);
        });
    });
}

function executeReqProcessor(source) {
    return getSourceContent(source)
        .then(parseFileContents)
        .then(makeRequest)
        .then(logToConsole)
        .catch(logToConsole);
}

module.exports = executeReqProcessor;