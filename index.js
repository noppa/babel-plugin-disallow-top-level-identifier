// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-rename-a-binding-and-its-references

const blacklist = ['module']

module.exports = function(ctx) {
  const t = ctx.types
  return {
    visitor: {
      Program(path) {
        blacklist.forEach(reanameIfExists(path.scope))
      }
    }
  }
}
