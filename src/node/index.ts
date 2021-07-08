import loadDependencies from './loadDependency';
import getLicenses from './getLicenses';

const getNodeLicenses = () => {
  const dependencies = loadDependencies();
  const licenses = getLicenses(dependencies);

  console.log(licenses);
};

export default getNodeLicenses;
