#!/usr/bin/env node
import { program } from 'commander';

const packageJson = require(`${__dirname}/../package.json`);

program.version(packageJson.version);

program.parse(process.argv);
