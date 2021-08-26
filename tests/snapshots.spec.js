const babel = require('@babel/core');
const path = require('path');

const should = (/**@type {string}*/descr, /**@type {string}*/js) => it('should ' + descr, () => {
  const {code} = babel.transform(js.trim(), {
    babelrc: false,
    extends: path.join(__dirname, '.babelrc')
  });

  expect(code).toMatchSnapshot();
});

should('work with a simple module', `

let module = 'f';
module += 'oo'

export { module }

`);

should('work with object property shorthands', `

const module = 'foo';
const foo = { module };

`);

should('not modify variables in deeper scopes', `

function bar(a) {
  const module = 'foo';
  return module + 'ooo';
}

const foobar = module => bar(module)

`);

should('work work with multiple variables', `

let module = 5;
const exports = 6;
const foobar = 8;

`);

should('be safe even if _ prefixed name also exists', `

let module = 5;
let _module = 6;

`);

should('work with the example case in README', `

// Gets renamed because the variable is in the top level of the file
let module = 'f';
module += 'oo'

function bar() {
  // Doesn't get renamed because the variable is in a function
  const module = 'foo';
  return module + 'ooo';
}

export { module }

`);