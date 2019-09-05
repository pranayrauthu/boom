#!/usr/bin/env node

const program = require('commander');

const curlProcessor = require('./processors/curl-processor');

program
    .version('1.0.0')
    .description('command line http tool');

program
    .command('c <source>')
    .description('converts the http req. to curl command')
    .action(curlProcessor);

program.parse(process.argv);