# drew

All the commands below are examples from Arch Linux. It may change depending on what distribution you use.

## Goals

Develop an online Molecular Editor for Chemists

## Current Status

Currently, one can open up XYZ files and see atoms and bonds!

## Using the application

Navigate to [drew](http://drew-molecules.meteor.com/)

## "Building" from GitHub Repo

* Install [Node](https://nodejs.org/en/), follow documentation
* Install [Meteor](https://www.meteor.com/), follow documentation
* `git clone http://github.com/barrymoo/drew.git`
* `cd drew`
* `meteor`

## Building the Documentation

* Install [jsdoc](http://usejsdoc.org/), `npm install -g jsdoc`
* `./build-docs.sh`
* `google-chrome-stable docs/index.html`

## To Do

* Clean up and add more documentation
* Check the code structure and cleanliness
* Create contribution guidelines (for example, add a parser)
* Make sidebar more dynamic

## Tools and References

* [Discover Meteor](https://book.discovermeteor.com)
* [Meteor Docs](http://docs.meteor.com/#/basic)
* [Three.js](http://threejs.org)

## License

I need to pick a license, but I need to get some input from people. For now, this code is free and I hope people will
contribute in anyway they can. I am not personally liable for anything you do with the software. I am not personally
liable for you using the software
