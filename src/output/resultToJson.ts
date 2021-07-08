import path from 'path';
import { writeFileSync } from 'fs';

import { PackageInfo } from '../types/packageInfo';

const resultToJson = (result: PackageInfo[], dest: string | null): string => {
  const json = JSON.stringify(result, null, 4);

  if (dest) {
    writeFileSync(dest, json);

    return dest;
  }

  writeFileSync(path.join(process.cwd(), 'licenses.json'), json);

  return path.join(process.cwd(), 'licenses.json');
};

export default resultToJson;
