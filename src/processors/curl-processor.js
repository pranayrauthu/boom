const {
    getSourceContent,
    logToConsole,
    parseFileContents
} = require('./../utils');

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

function curlProcessor(source) {
    // TODO: massage the file contents
    return getSourceContent(source)
        .then(parseFileContents)
        .then(convertToCurl)
        .then(logToConsole)
        .catch(logToConsole);
}

module.exports = curlProcessor;