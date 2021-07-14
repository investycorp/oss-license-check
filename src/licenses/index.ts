import spdxLicenseList from 'spdx-license-list/full';

import outputMessage from '../output';

const getFullLicenseText = (spdxIdentifier: string) => {
  if (spdxLicenseList[spdxIdentifier]) {
    return spdxLicenseList[spdxIdentifier].licenseText;
  }

  outputMessage('red', `${spdxIdentifier} is not included in spdx licenses list. please check license identifier.`);

  return 'unknown';
};

const getLicenseFullName = (spdxIdentifier: string) => {
  if (spdxLicenseList[spdxIdentifier]) {
    return spdxLicenseList[spdxIdentifier].name;
  }

  outputMessage('red', `${spdxIdentifier} is not included in spdx licenses list. please check license identifier.`);

  return 'unknown';
};

const getSpdxByURL = (url: string) => {
  const spdxObj = Object.entries(spdxLicenseList);
  const result = spdxObj.find((item: any) => url.includes(item[1].url));

  if (result) {
    return result[0];
  }

  return 'unknown';
};

export { getFullLicenseText, getLicenseFullName, getSpdxByURL };
