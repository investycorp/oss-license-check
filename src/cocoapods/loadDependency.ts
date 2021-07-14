import { readFileSync } from 'fs';
import glob from 'glob';

const loadDependencies = () => new Promise<string[]>((resolve) => {
  const dependencies: string[] = [];

  glob(`${process.cwd()}/**/Podfile`, {}, (err, files) => {
    Promise.all(files.map(async (file) => {
      const podFile = readFileSync(file);

      console.log(podFile);
    })).then(() => {
      resolve(Array.from(new Set(dependencies)));
    });
  });
});

export default loadDependencies;
