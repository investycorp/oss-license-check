import fetch from 'node-fetch';
import XMLParser from 'fast-xml-parser';

import { PackageInfo } from '../types/packageInfo';
import { getSpdxByURL } from '../licenses';
import outputMessage from '../output';

const getLicenses = (dependencies: string[]) => new Promise<PackageInfo[]>((resolve) => {
  const licenses: PackageInfo[] = [];

  Promise
    .all(
      dependencies.map(async (packageName) => {
        const packageNameArr = packageName.split('/');
        let successFindDependency = false;

        try {
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

              if (name === 'unknown') {
                outputMessage('red', `Can't found name for ${packageName}. please check name of ${packageName}`);
              }

              if (license === 'unknown') {
                outputMessage('red', `Can't found license for ${packageName}. please check license of ${packageName}`);
              }

              if (repositoryUrl === 'unknown') {
                outputMessage('red', `Can't found scm information for ${packageName}. please check scm information of ${packageName}`);
              }

              if (copyright === 'unknown') {
                outputMessage('red', `Can't found copyright information for ${packageName}. please check information of ${packageName}`);
              }

              successFindDependency = true;

              licenses.push({
                name: name || 'unknown',
                license: license || 'unknown',
                copyright,
                repositoryUrl: repositoryUrl || 'unknown',
              });
            }
          }
        } catch (error) {
          if (error.message === 'Timeout' || 'Network request failed') {
            outputMessage('red', 'Failed connect to maven central repository. Please check network');
          }
        }

        // if gradle dependency in google maven repository
        if (!successFindDependency) {
          try {
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

                if (name === 'unknown') {
                  outputMessage('red', `Can't found name for ${packageName}. please check name of ${packageName}`);
                }

                if (license === 'unknown') {
                  outputMessage('red', `Can't found license for ${packageName}. please check license of ${packageName}`);
                }

                if (repositoryUrl === 'unknown') {
                  outputMessage('red', `Can't found scm information for ${packageName}. please check scm information of ${packageName}`);
                }

                if (copyright === 'unknown') {
                  outputMessage('red', `Can't found copyright information for ${packageName}. please check information of ${packageName}`);
                }

                successFindDependency = true;

                licenses.push({
                  name: name || 'unknown',
                  license: license || 'unknown',
                  copyright,
                  repositoryUrl: repositoryUrl || 'unknown',
                });
              }
            }
          } catch (error) {
            if (error.message === 'Timeout' || 'Network request failed') {
              outputMessage('red', 'Failed connect to google maven repository. Please check network');
            }
          }
        }

        if (!successFindDependency) {
          outputMessage('red', `Can't find information of ${packageName} on maven central and google maven repository.`);
        }
      }),
    )
    .then(() => {
      resolve(licenses);
    });
});

export default getLicenses;
export { PackageInfo };
