import path from 'path';
import { readdirSync, readFileSync, existsSync } from 'fs';

import { PackageInfo } from '../types/packageInfo';
import outputMessage from '../output';

const getLicenses = (dependencies: string[]) => {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const licenses: PackageInfo[] = [];

  dependencies.forEach((packageName) => {
    let copyright = 'unknown';
    const packagePath = path.join(nodeModulesPath, packageName);
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJsonExists = existsSync(packageJsonPath);

    if (!packageJsonExists) {
      outputMessage('red', `package.json file is not exists on ${packageJsonPath}!`);
      return;
    }

    const packageJson = require(packageJsonPath);

    if (!packageJson.license) {
      outputMessage('red', `Can't found license for ${packageName}. please check license of ${packageName}`);
    }

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

    if (copyright === 'unknown') {
      outputMessage('red', `Can't found copyright information for ${packageName}. please check copyright information of ${packageName}`);
    }

    if (packageJson.repository) {
      if (packageJson.repository.url) {
        repositoryUrl = packageJson.repository.url;
        repositoryUrl = repositoryUrl.replace('git+', '');
        repositoryUrl = repositoryUrl.replace('.git', '');
      } else {
        outputMessage('red', `Can't found scm information for ${packageName}. please check scm information of ${packageName}`);
      }
    } else {
      outputMessage('red', `Can't found scm information for ${packageName}. please check scm information of ${packageName}`);
    }

    licenses.push({
      name: packageName, license, copyright, repositoryUrl,
    });
  });

  return licenses;
};

export default getLicenses;
export { PackageInfo };
