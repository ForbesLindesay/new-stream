# new-stream

Parse and Stringify newline separated streams (including JSON parsing if required)

[![Build Status](https://img.shields.io/travis/ForbesLindesay/new-stream/master.svg)](https://travis-ci.org/ForbesLindesay/new-stream)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/new-stream.svg)](https://david-dm.org/ForbesLindesay/new-stream)
[![NPM version](https://img.shields.io/npm/v/new-stream.svg)](https://www.npmjs.com/package/new-stream)

## Installation

    npm install new-stream

## API

The `TransformStream`s are [barrage](https://github.com/ForbesLindesay/barrage) streams, which gives them the additional API methods:

 - `.syphon`: like `pipe` but also passes on errors
 - `.buffer`: get an array of all elements in the stream

### parse(options) => TransformStream

Options:

 - json (default: `false`) should each line be parsed as JSON
 - strict (default: `false`) if this option is false, all lines that fail to be parsed as JSON will just be ignored

### stringify(options) => TransformStream

Options:

 - json (default: `false`) should each line be stringified using JSON

## License

  MIT