import loadDependencies from './loadDependency';
// import getLicenses from './getLicenses';
import outputMessage from '../output';

const getCocoaPodsLicenses = async () => {
  outputMessage('green', 'Get CocoaPods dependencies..');

  const dependencies = await loadDependencies();
  //   const licenses = await getLicenses(dependencies);

  console.log(dependencies);

  return [];
};

export default getCocoaPodsLicenses;
