import path from 'path';
import { writeFileSync, readFileSync } from 'fs';
import escapeHtml from 'escape-html';

import { PackageInfo } from '../types/packageInfo';
import { getFullLicenseText, getLicenseFullName } from '../licenses';

const resultToHTML = (result: PackageInfo[], dest: string | null): string => {
  let template = readFileSync(path.join(__dirname, '../templates/html_template.html')).toString();
  const dependencies = result.map((dependency) => `
    <li>
        <h1 style="font-size: 16px; margin: 0; padding: 0;">${dependency.name}</h1>
        <p style="font-size: 12px; margin: 8px 0 0 10px; line-height: 18px;">
            <a href="${dependency.repositoryUrl}">${dependency.repositoryUrl}</a><br>
            Copyright ${dependency.copyright}<br>
            ${getLicenseFullName(dependency.license)}
        </p>
    </li>
  `);
  const licenses = Array.from(new Set(result.map((dependency) => dependency.license))).map((license) => `
  <li>
    <h1 style="font-size: 16px; margin: 8px 0 0; padding: 0;">${getLicenseFullName(license)}</h1>
    <p style="margin: 0; font-size: 12px; margin-top: 8px; line-height: 18px;">${escapeHtml(getFullLicenseText(license))}</p>
  </li>
  `);

  template = template.replace('{ dependencies }', dependencies.join(''));
  template = template.replace('{ licenses }', licenses.join(''));

  if (dest) {
    writeFileSync(dest, template);

    return dest;
  }

  writeFileSync(path.join(process.cwd(), 'licenses.html'), template);

  return path.join(process.cwd(), 'licenses.html');
};

export default resultToHTML;
