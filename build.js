/**
 * build.js
 * @ndaidong
 **/

import { mkdirSync, readFileSync, rmSync } from 'fs'

import { buildSync } from 'esbuild'

const pkg = JSON.parse(readFileSync('./package.json', { encoding: 'utf-8' }))

rmSync('dist', {
  force: true,
  recursive: true
})
mkdirSync('dist')

const buildTime = (new Date()).toISOString()
const comment = [
  `// ${pkg.name}@${pkg.version} ${pkg.repository.url}`,
  `built with esbuild at ${buildTime}`
].join(' - ')

const esmVersion = {
  entryPoints: ['src/main.js'],
  bundle: true,
  charset: 'utf8',
  target: ['es2020', 'node14'],
  minify: true,
  write: true,
  platform: 'browser',
  format: 'esm',
  sourcemap: 'external',
  outfile: 'dist/bella.esm.js',
  banner: {
    js: comment
  }
}
buildSync(esmVersion)
