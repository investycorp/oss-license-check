#!/usr/bin/env node
import { program } from 'commander';

import getNodeLicense from './node';

const packageJson = require(`${__dirname}/../package.json`);

program.version(packageJson.version);
program.option('--json, --json [dest]', 'Result export to json file');
program.parse(process.argv);

const options = program.opts();

getNodeLicense(options.json);
