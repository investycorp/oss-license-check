import path from 'path';

interface PackageInfo {
    name: string;
    license: string;
}

const getLicenses = (dependencies: string[]) => {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const licenses: PackageInfo[] = [];

  dependencies.forEach((packageName) => {
    const packagePath = path.join(nodeModulesPath, packageName);
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = require(packageJsonPath);
    const license = packageJson.license ? packageJson.license : 'unknown';

    licenses.push({ name: packageName, license });
  });

  return licenses;
};

export default getLicenses;
export { PackageInfo };
