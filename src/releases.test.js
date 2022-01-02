// release.test

/* eslint-env jest */

import {
  existsSync,
  readFileSync
} from 'fs'

const pkg = JSON.parse(readFileSync('./package.json'))

const esmFile = 'bella.esm.js'
const cjsFile = 'cjs/bella.js'
const minFile = './dist/bella.min.js'

const runtest = (fname) => {
  const fpath = `./dist/${fname}`
  describe(`Validate ${fname} version output`, () => {
    test(`Check if ${fpath} file created`, () => {
      expect(existsSync(fpath)).toBeTruthy()
    })
    const constent = readFileSync(fpath, 'utf8')
    const lines = constent.split('\n')
    test('Check if file meta contains package info', () => {
      expect(lines[1].startsWith(` * ${pkg.name}@${pkg.version}`)).toBeTruthy()
      expect(lines[2].startsWith(' * built with esbuild at:')).toBeTruthy()
      expect(lines[3].startsWith(` * repository: ${pkg.repository.url}`)).toBeTruthy()
      expect(lines[4].startsWith(` * maintainer: ${pkg.author}`)).toBeTruthy()
      expect(lines[5].startsWith(` * License: ${pkg.license}`)).toBeTruthy()
    })
  })
}

const arr = [
  esmFile,
  cjsFile
]

arr.map(runtest)

describe('Test generated module for browser', () => {
  test('Check if bella.min.js created', () => {
    expect(existsSync(minFile)).toBeTruthy()
  })
  const constent = readFileSync(minFile, 'utf8')
  const lines = constent.split('\n')
  test('Check if file meta contains package info', () => {
    expect(lines[0].includes(`${pkg.name}@${pkg.version}`)).toBeTruthy()
    expect(lines[0].includes(pkg.author)).toBeTruthy()
    expect(lines[0].includes(pkg.license)).toBeTruthy()
  })
})
