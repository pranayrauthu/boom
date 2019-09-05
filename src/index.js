#!/usr/bin/env node

const program = require('commander');

const curlProcessor = require('./processors/curl-processor');
const executeReqProcessor = require('./processors/execute-req-processor');

program
    .name('boom')
    .usage('command [args]')
    .version('1.0.0')
    .description('command line http tool');

program
    .command('c <source>')
    .description('converts the http req. to curl command')
    .action(curlProcessor);

program
    .command('x <source>')
    .description('executes the http req.')
    .action(executeReqProcessor);

program.parse(process.argv);