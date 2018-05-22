# babel-plugin-disallow-top-level-identifier
A very simple Babel plugin to rename some problematic identifiers from the top level of a module.

Example Babel config:
```JSON
{
  "plugins": [
    ["disallow-identifier", {
      "disallow": ["module", "exports"]
    }]
  ]
}
```

Input:
```JavaScript
// Gets renamed because the variable is in the top level of the file
let module = 'f';
module += 'oo'

function bar() {
  // Doesn't get renamed because the variable is in a function
  const module = 'foo';
  return module + 'ooo';
}

export { module }
```

Output:
```JavaScript
let _module = 'f';
_module += 'oo';

function bar() {
  // Doesn't get renamed because the variable is in a function
  const module = 'foo';
  return module + 'ooo';
}

export { _module as module };
```