import glob from 'glob';
import g2js from 'gradle-to-js/lib/parser';

const loadDependencies = () => new Promise<string[]>((resolve) => {
  const dependencies: string[] = [];

  glob(`${process.cwd()}/**/build.gradle`, {}, (err, files) => {
    Promise.all(files.map(async (file) => {
      const representation = await g2js.parseFile(file);

      if (representation.dependencies) {
        representation.dependencies.forEach((dependency: any) => {
          if (dependency.type === 'implementation' && dependency.group && dependency.name && dependency.version !== '+') {
            dependencies.push(`${dependency.group}/${dependency.name}/${dependency.version}`);
          }
        });
      }
    })).then(() => {
      resolve(Array.from(new Set(dependencies)));
    });
  });
});

export default loadDependencies;
