import loadDependencies from './loadDependency';
import getLicenses from './getLicenses';
import outputMessage from '../output';

const getGradleLicenses = async () => {
  outputMessage('green', 'Get gradle dependencies..');

  const dependencies = await loadDependencies();
  const licenses = await getLicenses(dependencies);

  return licenses;
};

export default getGradleLicenses;
