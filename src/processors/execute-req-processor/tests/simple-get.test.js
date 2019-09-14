const path = require('path');

const executeReqProcessor = require('./../execute-req-processor');

beforeEach(() => {
    global.console = {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn()
    };
});

test('should execute get request', () => {

    const fileSrc = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'sample',
        'simple-get.http');
    const expected = [
        `{"userId":1,"id":1,"title":"sunt aut facere repellat provident occaecati excepturi optio reprehenderit","body":"quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"}`
    ].join('\n');
    return executeReqProcessor(fileSrc).then(() => {
        expect(global.console.log).toHaveBeenCalledWith(
            expected
        );
    });

});
