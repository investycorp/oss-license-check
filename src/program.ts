#!/usr/bin/env node
import { program } from 'commander';

import getNodeLicenses from './node';
import getGradleLicenses from './gradle';
import outputMessage from './output';
import resultToHTML from './output/resultToHTML';
import resultToJson from './output/resultToJson';

const packageJson = require(`${__dirname}/../package.json`);

program.version(packageJson.version);
program.option('--json, --json [dest]', 'Result export to json file');
program.option('--html, --html [dest]', 'Result export to html file');
program.option('--template [templateFile]', 'Custom template for export to html file');
program.parse(process.argv);

const options = program.opts();
const launch = async (opts: any) => {
  const { json, html, template } = opts;

  const nodeLicenses = getNodeLicenses();
  const gradleLicenses = await getGradleLicenses();
  const licenses = [...nodeLicenses, ...gradleLicenses];

  console.log(licenses);

  if (typeof json === 'boolean' || typeof json === 'string') {
    outputMessage('cyan', 'Result export to json..');

    const result = resultToJson(licenses, typeof json === 'string' ? json : null);

    outputMessage('orange', `Result is saved at ${result}`);
  }

  if (typeof html === 'boolean' || typeof html === 'string') {
    outputMessage('cyan', 'Result export to html..');

    const result = typeof template === 'string'
      ? resultToHTML(licenses, typeof html === 'string' ? html : null, template)
      : resultToHTML(licenses, typeof html === 'string' ? html : null);

    outputMessage('orange', `Result is saved at ${result}`);
  }
};

launch(options);
