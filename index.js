module.exports = function() {
  return {
    visitor: {
      Program: function(path, state) {
        let words = state.opts && state.opts.words;
        if (!Array.isArray(words)) {
          const msg = 
            'Expected option "words" to be a list of blacklisted words, but got ' + words;
          throw new Error(msg);
        }

        words.forEach(reanameIfExists(path.scope));
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
