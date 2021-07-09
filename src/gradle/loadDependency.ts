import glob from 'glob';
import g2js from 'gradle-to-js/lib/parser';

const loadDependencies = () => new Promise((resolve) => {
  const dependencies: string[] = [];

  glob(`${process.cwd()}/**/build.gradle`, {}, (err, files) => {
    Promise.all(files.map(async (file) => {
      const representation = await g2js.parseFile(file);

      if (representation.dependencies) {
        representation.dependencies.forEach((dependency: any) => {
          if (dependency.type === 'implementation' && dependency.group && dependency.name) {
            dependencies.push(`${dependency.group}/${dependency.name}`);
          }
        });
      }
    })).then(() => {
      resolve(dependencies);
    });
  });
});

export default loadDependencies;
