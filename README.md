# new-stream

Parse and Stringify newline separated streams (including JSON parsing if required)

[![Build Status](https://travis-ci.org/ForbesLindesay/new-stream.png?branch=master)](https://travis-ci.org/ForbesLindesay/new-stream)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/new-stream.png)](https://gemnasium.com/ForbesLindesay/new-stream)
[![NPM version](https://badge.fury.io/js/new-stream.png)](http://badge.fury.io/js/new-stream)

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