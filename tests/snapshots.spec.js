const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

/* globals __dirname */
const testcasesDir = (...pathnames) => path.join(__dirname, 'testcases', ...pathnames);
const readFile = promisify(fs.readFile);

fs.readdirSync(testcasesDir())
  .filter(_ => path.extname(_) === '.js')
  .sort()
  .map(_ => ({
    filename: _,
    testName: _.match(/[0-9]+_([a-zA-Z-]+)/)[1].replace(/-/g, ' ')
  }))
  .forEach(({filename, testName}) => {

    it(`Should work with ${testName}`, async () => {
      const file = await readFile(testcasesDir(filename), 'utf8');
      const {code} = babel.transform(file);
      
      expect(code).toMatchSnapshot();
    });

  });

