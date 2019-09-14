const path = require('path');

const executeReqProcessor = require('./../execute-req-processor');

beforeEach(() => {
    global.console = {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn()
    };
});

test('should execute post request', () => {

    const fileSrc = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'sample',
        'simple-post.http');
    const expected = [
        `{"title":"foo","body":"bar","userId":1,"id":101}`
    ].join('\n');
    return executeReqProcessor(fileSrc).then(() => {
        expect(global.console.log).toHaveBeenCalledWith(
            expected
        );
    });

});
