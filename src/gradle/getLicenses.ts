import fetch from 'node-fetch';
import XMLParser from 'fast-xml-parser';

import { PackageInfo } from '../types/packageInfo';
import { getSpdxByURL } from '../licenses';

const getLicenses = (dependencies: string[]) => new Promise<PackageInfo[]>((resolve) => {
  const licenses: PackageInfo[] = [];

  Promise
    .all(
      dependencies.map(async (packageName) => {
        const packageNameArr = packageName.split('/');
        const url = `http://search.maven.org/solrsearch/select?q=g:"${packageNameArr[0]}"+AND+a:"${packageNameArr[1]}"&rows=20&core=gav`;
        const mvnResponse = await fetch(url).then((response) => response.json());

        // if gradle dependency in maven central
        if (mvnResponse.response.numFound) {
          const docs = mvnResponse.response.docs[0];
          const artifactResponse = await fetch(
            `https://search.maven.org/remotecontent?filepath=${docs.g.split('.').join('/')}/${docs.a}/${docs.v}/${docs.a}-${docs.v}.pom`,
          ).then((response) => response.text());
          const artifact = XMLParser.parse(artifactResponse);

          if (artifact.project) {
            const name = artifact.project.name || 'unknown';
            let license = 'unknown';
            const repositoryUrl = artifact.project.scm.url || 'unknown';
            let copyright = 'unknown';

            if (artifact.project.organization) {
              copyright = `Copyright (c) ${artifact.project.organization.name}`;
            } else if (artifact.project.developers) {
              copyright = `Copyright (c) ${artifact.project.developers.developer.name}`;
            }

            if (artifact.project.licenses.license.url) {
              const spdxInfo = getSpdxByURL(artifact.project.licenses.license.url);

              license = spdxInfo;
            }

            licenses.push({
              name: name || 'unknown',
              license: license || 'unknown',
              copyright,
              repositoryUrl: repositoryUrl || 'unknown',
            });
          }
        }
        // if gradle dependency in google maven repository
        const packageAuthor = packageNameArr[0].split('.').join('/');
        const artifactName = packageNameArr[1];
        const artifactVersion = packageNameArr[2];
        const googleUrl = `https://dl.google.com/android/maven2/${packageAuthor}/${artifactName}/${artifactVersion}/${artifactName}-${artifactVersion}.pom`;
        const googleResponse = await fetch(googleUrl);

        if (googleResponse.status === 200) {
          const googleResponseBody = await googleResponse.text();
          const artifact = XMLParser.parse(googleResponseBody);

          if (artifact.project) {
            const name = artifact.project.name || 'unknown';
            let license = 'unknown';
            let copyright = 'unknown';
            let repositoryUrl = 'unknown';

            if (artifact.project.organization) {
              copyright = `Copyright (c) ${artifact.project.organization.name}`;
            } else if (artifact.project.developers) {
              copyright = `Copyright (c) ${artifact.project.developers.developer.name}`;
            }

            if (artifact.project.licenses.license.url) {
              const spdxInfo = getSpdxByURL(artifact.project.licenses.license.url);

              license = spdxInfo;
            }

            if (artifact.project.scm.connection) {
              repositoryUrl = artifact.project.scm.connection.replace('scm:git:', '');
            }

            licenses.push({
              name: name || 'unknown',
              license: license || 'unknown',
              copyright,
              repositoryUrl: repositoryUrl || 'unknown',
            });
          }
        }
      }),
    )
    .then(() => {
      resolve(licenses);
    });
});

export default getLicenses;
export { PackageInfo };
