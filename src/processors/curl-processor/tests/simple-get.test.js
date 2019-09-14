const path = require('path');

const curlProcessor = require('./../curl-processor');

beforeEach(() => {
    global.console = {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn()
    };
});

test('should convert get request', () => {

    const fileSrc = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'sample',
        'simple-get.http');
    const expected = [
        `curl -XGET https://jsonplaceholder.typicode.com/posts/1`
    ].join('\n');
    return curlProcessor(fileSrc).then(() => {
        expect(global.console.log).toHaveBeenCalledWith(
            expected
        );
    });

});