#!/usr/bin/env node
import { program } from 'commander';

import getNodeLicense from './node';

const packageJson = require(`${__dirname}/../package.json`);

program.version(packageJson.version);

program.parse(process.argv);

getNodeLicense();
