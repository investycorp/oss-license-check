import path from 'path';

const loadDependencies = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = require(packageJsonPath);
  const dependencies = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];

  return dependencies;
};

export default loadDependencies;
