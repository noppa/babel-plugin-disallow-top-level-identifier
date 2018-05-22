module.exports = function() {
  let alreadyThrewOptionsError = false;
  return {
    visitor: {
      Program: function(path, state) {
        let blacklist = state.opts && state.opts.disallow;
        if (!Array.isArray(blacklist)) {
          if (!alreadyThrewOptionsError) {
            const msg = 
              'Expected option "disallow" to be a list of disallowed words, but got ' + blacklist;
            alreadyThrewOptionsError = true;
            throw new Error(msg);
          } else {
            return;
          }
        }

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
