// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-rename-a-binding-and-its-references

const blacklist = ['module'];

module.exports = function() {
  return {
    visitor: {
      Program: function(path) {
        blacklist.forEach(reanameIfExists(path.scope));
      }
    }
  };
};

const reanameIfExists = scope => blacklistedWord => {
  if (scope.hasOwnBinding(blacklistedWord)) {
    const newId = scope.generateUidIdentifier(blacklistedWord);
    scope.rename(blacklistedWord, newId.name);
  }
};
