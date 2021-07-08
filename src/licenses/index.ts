import spdxLicenseList from 'spdx-license-list/full';

const getFullLicenseText = (spdxIdentifier: string) => spdxLicenseList[spdxIdentifier].licenseText;
const getLicenseFullName = (spdxIdentifier: string) => spdxLicenseList[spdxIdentifier].name;

export { getFullLicenseText, getLicenseFullName };
