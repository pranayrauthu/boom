const path = require('path');

const curlProcessor = require('./../curl-processor');

beforeEach(() => {
    global.console = {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn()
    };
});

test('should convert post request', () => {

    const fileSrc = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'sample',
        'simple-post.http');
    const expected = [
        `curl -XPOST https://jsonplaceholder.typicode.com/posts -H "Content-Type: application/json; charset=UTF-8"`
    ].join('\n');
    return curlProcessor(fileSrc).then(() => {
        expect(global.console.log).toHaveBeenCalledWith(
            expected
        );
    });

});