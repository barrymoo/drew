#!/usr/bin/env bash

if [ ! -d .docs ]; then
    mkdir .docs
fi

jsdoc . -r -c conf.json -d .docs
