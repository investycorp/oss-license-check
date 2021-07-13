import loadDependencies from './loadDependency';
import getLicenses from './getLicenses';
import outputMessage from '../output';

const getNodeLicenses = () => {
  outputMessage('green', 'Get nodejs dependencies..');

  const dependencies = loadDependencies();
  const licenses = getLicenses(dependencies);

  return licenses;
};

export default getNodeLicenses;
