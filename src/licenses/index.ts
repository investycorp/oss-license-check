import spdxLicenseList from 'spdx-license-list/full';

const getFullLicenseText = (spdxIdentifier: string) => spdxLicenseList[spdxIdentifier].licenseText;
const getLicenseFullName = (spdxIdentifier: string) => spdxLicenseList[spdxIdentifier].name;
const getSpdxByURL = (url: string) => {
  const spdxObj = Object.entries(spdxLicenseList);
  const result = spdxObj.find((item: any) => url.includes(item[1].url));

  if (result) {
    return result[0];
  }

  return 'unknown';
};

export { getFullLicenseText, getLicenseFullName, getSpdxByURL };
