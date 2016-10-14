# YarNPM
YarNPM is a [YARN](https://github.com/yarnpkg/yarn) wrapper which transforms `npm` commands to `yarn`, use `npm` as `yarn`!

[![NPM](https://nodei.co/npm/yarnpm.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.com/yarnpm/)

## What is Yarn ?
Yarn is a Fast, reliable, and secure dependency management that can be used as a replacement of NPM and other tools.

## So Why do i need this?
Yarn is great, but many tools still (and maybe for months) are depending on `npm` command, this tool adds a global `npm`
wrapper binary which:
 + Automatically converts args from `npm` to `yarn` (for example `npm install`=>`yarn add`)
 + Detects currently unsupported features of yarn and fall backs to `npm`
   - Scoped packages
 + Allows you to to specify which tool to use, still using `npm` command

**Related Topics**
- [Support Yarn #371](https://github.com/lerna/lerna/issues/371)
- [Use Yarn instead of npm for installing packages #4](https://github.com/motion/lerna/pull/4)
- [Yarn #4713](https://github.com/babel/babel/pull/4713)
 
## Usage

Install global binary:
```
npm install --global yarnpm
```
Install a syslink from `yarnpm` to `/usr/local/bin/npm` or `%WINDOWS%/system32/npm` :
```
### RUN ME AS ROOT/AMINISTRATOR ###
yarnpm install yarnpm
```


**Check npm command in a NEW Terminal**
```
$ npm --help

  Usage: yarn install [flags]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
```

**Additional Steps if it does not works**   

**Force Using NPM Or Yarn**     
Use `--npm` or `--yarn` flag

## Development

```
npm run install:npm
npm run install:global
```
