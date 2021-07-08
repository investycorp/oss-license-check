import loadDependencies from './loadDependency';
import getLicenses from './getLicenses';
import outputMessage from '../output';
import resultToJson from '../output/resultToJson';
import resultToHTML from '../output/resultToHTML';

const getNodeLicenses = (json: any, html: any) => {
  outputMessage('green', 'Get nodejs dependencies..');

  const dependencies = loadDependencies();
  const licenses = getLicenses(dependencies);

  console.log(licenses);

  if (typeof json === 'boolean' || typeof json === 'string') {
    outputMessage('cyan', 'Result export to json..');

    const result = resultToJson(licenses, typeof json === 'string' ? json : null);

    outputMessage('orange', `Result is saved at ${result}`);
  }

  if (typeof html === 'boolean' || typeof html === 'string') {
    outputMessage('cyan', 'Result export to html..');

    const result = resultToHTML(licenses, typeof html === 'string' ? html : null);

    outputMessage('orange', `Result is saved at ${result}`);
  }
};

export default getNodeLicenses;
