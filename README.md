# drew

all the commands below are examples from Arch Linux. It may change depending on what distribution you use.

## Goals

Develop an online Molecular Editor for Chemists

## Current Status

Currently, one can open up XYZ files and see atoms and bonds!

## Using the application

Navigate to [drew](http://drew-molecules.meteor.com/)

## Contributing

* Fork the repository
* Make you changes/patches
* Submit a pull request

## "Building" from GitHub Repo

* Install [Node](https://nodejs.org/en/), follow documentation
* Install [Meteor](https://www.meteor.com/), follow documentation
* `git clone http://github.com/barrymoo/drew.git`
* `cd drew`
* `meteor`

## Building the Documentation

* Install [jsdoc](http://usejsdoc.org/), `npm install -g jsdoc`
* `./build-docs.sh`
* `google-chrome-stable .docs/index.html`

## Writing a file parser

Let's say your favorite file extension is XYZ (note we already support this file type
and you should use `client/parsers/xyz.js` as an example)

1. In `client/parsers` add your parser file `xyz.js`
2. Write your parser:
* Always use Angstrom units!
* Include some tests to ensure the file is legit (see `client/parsers/checks.js`
for an example of checking the coordinate is a `{THREE.Vector3}`)
3. Register the file extension in `client/parsers/master.js`
4. Test!
5. Add your extension to the Supported File Types List Below

## Supported File Types

* XYZ - An XYZ file in Angstrom units

## Issues

Submit an issue!

## To Do

* Editor Mode
* Clean up and add more documentation
* Check the code structure and cleanliness
* Create contribution guidelines (for example, add a parser)
* Make sidebar more dynamic
* Make templates prettier

## Tools and References

* [Discover Meteor](https://book.discovermeteor.com)
* [Meteor Docs](http://docs.meteor.com/#/basic)
* [Three.js](http://threejs.org)
