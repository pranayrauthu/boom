#!/usr/bin/env node

const program = require('commander');

program
    .version('1.0.0')
    .description('command line http tool');

console.log('application is ready...');

program.parse(process.argv);