import loadDependencies from './loadDependency';
import getLicenses from './getLicenses';
import outputMessage from '../output';
import resultToJson from '../output/resultToJson';

const getNodeLicenses = (json: any) => {
  outputMessage('green', 'Get nodejs dependencies..');

  const dependencies = loadDependencies();
  const licenses = getLicenses(dependencies);

  if (typeof json === 'boolean' || typeof json === 'string') {
    outputMessage('cyan', 'Result export to json..');

    const result = resultToJson(licenses, typeof json === 'string' ? json : null);

    outputMessage('orange', `Result is saved at ${result}`);
  }
};

export default getNodeLicenses;
