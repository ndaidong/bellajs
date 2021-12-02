// release.test

/* eslint-env jest */

const {
  existsSync,
  readFileSync
} = require('fs')

const pkg = require('../package.json')

const fullFile = './dist/bella.js'
const minFile = './dist/bella.min.js'
const mapFile = './dist/bella.min.map'

describe('Validate minification output', () => {
  test('Check if minification file created', () => {
    expect(existsSync(minFile)).toBeTruthy()
  })
  const constent = readFileSync(minFile, 'utf8')
  const lines = constent.split('\n')
  test('Check if minification file contains package info', () => {
    expect(lines[0].includes(`${pkg.name}@${pkg.version}`)).toBeTruthy()
    expect(lines[0].includes(pkg.author)).toBeTruthy()
    expect(lines[0].includes(pkg.license)).toBeTruthy()
  })
})

describe('Validate regular version output', () => {
  test('Check if non-minified file created', () => {
    expect(existsSync(fullFile)).toBeTruthy()
  })
  const constent = readFileSync(fullFile, 'utf8')
  const lines = constent.split('\n')
  test('Check if minification file contains package info', () => {
    expect(lines[1].startsWith(` * ${pkg.name}@${pkg.version}`)).toBeTruthy()
    expect(lines[2].startsWith(' * built on:')).toBeTruthy()
    expect(lines[3].startsWith(` * repository: ${pkg.repository.url}`)).toBeTruthy()
    expect(lines[4].startsWith(` * maintainer: ${pkg.author}`)).toBeTruthy()
    expect(lines[5].startsWith(` * License: ${pkg.license}`)).toBeTruthy()
  })
})

describe('Validate debug file output', () => {
  test('Check if map file generated', () => {
    expect(existsSync(mapFile)).toBeTruthy()
  })
})
