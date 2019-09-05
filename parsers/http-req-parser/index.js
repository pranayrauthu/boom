

class HTTPRequestParser{
    parse(reqMessage){
        const [
            firstLine,
            ...restLines
        ] = this._splitLines(reqMessage);

        const {
            headerLines,
            bodyLines
        } = restLines.reduce( (acc, cur) => {
            if(!cur){
                acc.isBlankLineReached = true;
            }

            if(!acc.isBlankLineReached){
                acc.headerLines.push(cur);
            } else {
                acc.bodyLines.push(cur);
            }

            return acc;
        }, {
            isBlankLineReached: false,
            headerLines: [],
            bodyLines: []
        } );


        return {
            ...this._processFirstLine(firstLine),
            headers: this._processHeaders(headerLines),
            body: this._processReqBody(bodyLines)
        };
    }
    _trimString(input){
        return input.trim();
    }
    _splitLines(input){
        return this._trimString(input).split('\n')
            .map( line => this._trimString(line) );
    }
    /**
     * extracts the http method url and the version.
     * 
     * @param {String} firstLineStr
     * @returns {Object}
     */
    _processFirstLine(firstLineStr){
        const [
            method,
            url,
            version
        ] = firstLineStr.split(' ');

        // TODO: need to validate the method

        // TODO: need to validate the url

        // TODO: need to validate the version

        return {
            method,
            url,
            version
        }
    }
    /**
     * 
     * @param {Array} headerStrings 
     * @returns {Array}
     */
    _processHeaders(headerStrings = []){
        return headerStrings.reduce((acc, cur) => {
            let [headerName, headerValue] = cur.split(':');
            headerName = this._trimString(headerName);
            headerValue = this._trimString(headerValue);
            acc.push({
                name: headerName,
                value: headerValue
            });
            return acc;
        }, []);
    }
    /**
     * 
     * @param {Array} bodyLines 
     * @returns {String}
     */
    _processReqBody(bodyLines){
        return bodyLines.join('\n');
    }
}

const httpRequestParser = new HTTPRequestParser();

module.exports = httpRequestParser;