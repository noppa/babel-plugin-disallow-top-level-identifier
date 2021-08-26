module.exports = function() {
  let alreadyThrewOptionsError = false;
  return {
    visitor: {
      Program: function(path, state) {
        let disllow = state.opts && state.opts.disallow;
        if (!Array.isArray(disllow)) {
          if (!alreadyThrewOptionsError) {
            const msg = 
              'Expected option "disallow" to be a list of disallowed words, but got ' + disllow;
            alreadyThrewOptionsError = true;
            throw new Error(msg);
          } else {
            return;
          }
        }

        disllow.forEach(renameIfExists(path.scope));
      }
    }
  };
};

const renameIfExists = scope => disallowedWord => {
  if (scope.hasOwnBinding(disallowedWord)) {
    const newId = scope.generateUidIdentifier(disallowedWord);
    scope.rename(disallowedWord, newId.name);
  }
};
