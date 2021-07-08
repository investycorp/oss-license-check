import path from 'path';
import { readdirSync, readFileSync } from 'fs';

import { PackageInfo } from '../types/packageInfo';

const getLicenses = (dependencies: string[]) => {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const licenses: PackageInfo[] = [];

  dependencies.forEach((packageName) => {
    let copyright = 'unknown';
    const packagePath = path.join(nodeModulesPath, packageName);
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = require(packageJsonPath);
    const license = packageJson.license ? packageJson.license : 'unknown';
    const packagePathFiles = readdirSync(packagePath);
    const licenseFileName = packagePathFiles.find((filename) => filename.match(/license\.*/gi));
    let repositoryUrl = '';

    if (licenseFileName) {
      const licenseFile = readFileSync(path.join(packagePath, licenseFileName)).toString();

      licenseFile.split(/\n/).forEach((line) => {
        if (line.includes('Copyright')) {
          copyright = line;
        }
      });
    }

    if (packageJson.repository) {
      if (packageJson.repository.url) {
        repositoryUrl = packageJson.repository.url;
        repositoryUrl = repositoryUrl.replace('git+', '');
        repositoryUrl = repositoryUrl.replace('.git', '');
      }
    }

    licenses.push({
      name: packageName, license, copyright, repositoryUrl,
    });
  });

  return licenses;
};

export default getLicenses;
export { PackageInfo };
