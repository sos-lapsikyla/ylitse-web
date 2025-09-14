const path = require('path');

// Jest doesn't support other than js-files so we need to convert them
// For more information see https://jestjs.io/docs/code-transformation#examples
module.exports = {
  process(sourceText, sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
