import path from 'path';
import { existsSync } from 'fs';

import outputMessage from '../output';

const loadDependencies = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonExists = existsSync(packageJsonPath);

  if (!packageJsonExists) {
    outputMessage('red', `package.json file is not exists on ${packageJsonPath}\nIf is node.js project, please check run path.`);

    return [];
  }

  const packageJson = require(packageJsonPath);
  const dependencies = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];

  return dependencies;
};

export default loadDependencies;
