// release.test

/* eslint-env jest */

import {
  existsSync,
  readFileSync
} from 'fs'

const pkg = JSON.parse(readFileSync('./package.json'))

const runtest = (fname) => {
  const fpath = `./dist/${fname}`
  describe(`Validate ${fname} version output`, () => {
    test(`Check if ${fpath} file created`, () => {
      expect(existsSync(fpath)).toBeTruthy()
    })
    const constent = readFileSync(fpath, 'utf8')
    const lines = constent.split('\n')
    test('Check if file meta contains package info', () => {
      expect(lines[0].includes(`${pkg.name}@${pkg.version}`)).toBeTruthy()
      expect(lines[0].includes(pkg.repository.url)).toBeTruthy()
    })
  })
  return fpath
}

runtest('bella.esm.js')
