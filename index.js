'use strict'

var Transform = require('barrage').Transform

exports.parse = parse
function parse(options) {
  options = options || {}
  var stream = new Transform({objectMode: true})
  var buffer = ''
  var errored = false
  stream._transform = function (chunk, encoding, callback) {
    if (errored) return callback()
    buffer += chunk.toString()
    while (buffer.indexOf('\n') != -1) {
      var next = buffer.substring(0, buffer.indexOf('\n')).replace(/\r$/, '')
      buffer = buffer.substring(buffer.indexOf('\n') + 1)
      try {
        next = parseLine(next, options)
      } catch (ex) {
        errored = true
        stream.emit('error', ex)
        return
      }
      if (next !== null) {
        stream.push(next)
      }
    }
    callback()
  }
  stream._flush = function (callback) {
    if (errored) return callback()
    var next = parseLine(buffer, options)
    if (next !== null) stream.push(next)
    callback()
  }
  return stream
}
function parseLine(str, options) {
  if (options.json) {
    try {
      return JSON.parse(str)
    } catch (ex) {
      if (options.strict) throw ex
      else return null
    }
  } else {
    return str
  }
}

exports.stringify = stringify
function stringify(options) {
  options = options || {}
  var stream = new Transform({objectMode: true})
  var first = true
  stream._transform = function (chunk, encoding, callback) {
    if (!first) stream.push('\n')
    first = false
    if (options.json) chunk = JSON.stringify(chunk)
    if (chunk.indexOf('\n') != -1) throw new Error('cannot newline stringify a stream containing newlines')
    stream.push(chunk)
    callback()
  }
  return stream
}