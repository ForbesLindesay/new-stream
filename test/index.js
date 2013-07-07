'use strict'

var assert = require('assert')
var Readable = require('barrage').Readable
var nstream = require('../')

function fromArray(arr) {
  var stream = new Readable({objectMode: true})
  stream._read = function () {
    while (arr.length) {
      stream.push(arr.shift())
    }
    stream.push(null)
  }
  return stream
}
describe('parse({json: true})', function () {
  it('parses newline separated JSON and is forgiving', function (done) {
    fromArray(['{"a":10}\n{"b":5}\n{"c":', '0}\nhello world\n', '{"d":-5}'])
      .syphon(nstream.parse({json: true}))
      .buffer(function (err, res) {
        if (err) return done(err)
        assert(res.length === 4)
        assert(res[0].a === 10)
        assert(res[1].b === 5)
        assert(res[2].c === 0)
        assert(res[3].d === -5)
        done()
      })
  })
})

describe('stringify({json: true})', function () {
  it('stringifies to newline separated JSON', function (done) {
    fromArray([{"a":10}, {"b":5}, {"c": 0}, {"d":-5}])
      .syphon(nstream.stringify({json: true}))
      .buffer('utf8', function (err, res) {
        if (err) return done(err)
        assert(res === '{"a":10}\n{"b":5}\n{"c":0}\n{"d":-5}')
        done()
      })
  })
})
