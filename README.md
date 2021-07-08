# oss-license-checker

## Get dependency and license information

You can check nodejs dependencies information and license information

```
npm install -g oss-license-checker
oss-license-checker
```

You can see something like below:

```
[
  {
    name: 'chalk',
    license: 'MIT',
    copyright: 'Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)',
    repositoryUrl: ''
  },
  {
    name: 'commander',
    license: 'MIT',
    copyright: 'Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>',
    repositoryUrl: 'https://github.com/tj/commander.js'
  },
  {
    name: 'escape-html',
    license: 'MIT',
    copyright: 'Copyright (c) 2015 Tiancheng "Timothy" Gu',
    repositoryUrl: ''
  },
  {
    name: 'spdx-license-list',
    license: 'CC0-1.0',
    copyright: "\tc. Affirmer disclaims responsibility for clearing rights of other persons that may apply to the Work or any use thereof, including without limitation any person's Copyright and Related Rights in the Work. Further, Affirmer disclaims responsibility for obtaining any necessary consents, permissions or other rights required for any use of the Work.",
    repositoryUrl: ''
  }
]
```

## Result export to JSON

You can export result to json file.

```
oss-license-checker --json
```

Result file is saved at './license.json'.

or, you can specify json saved path

```
oss-license-checker --json [dest]
```

## Result export to HTML

You can export result to html file.

```
oss-license-checker --html
```

Result file is saved at './license.html'.

or, you can specify html saved path

```
oss-license-checker --html [dest]
```

### Use custom template

You can use custom template on export to html.

We provide two variable.

```
{ dependencies }
```

dependencies variable is provide Dependency package name, copyright, license indeitifier information.

```
{ licenses }
```

licenses variable is provide license full text.

you can make template file, and use it, like below.

```
oss-license-checker --html --template [templateFilePath]
```

## License

MIT License, as found in the [LICENSE](https://github.com/investycorp/oss-license-checker/blob/master/LICENSE) file.
