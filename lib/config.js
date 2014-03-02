"use strict";
exports.defaults = function() {
  return {
    coffeelint: {
      exclude: [],
      rules: {}
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n  coffeelint:        # Configuration for coffeelint module\n    exclude:[]       # array of strings or regexes that match files to not coffeelint, strings\n                     # are paths that can be relative to the watch.compiledDir or absolute\n    rules:{}         # Rule overrides for the coffeelint module. Rule definitions can be\n                     # found at http://www.coffeelint.org/#options\n";
};

exports.validate = function(config, validators) {
  var errors;
  errors = [];
  if (validators.ifExistsIsObject(errors, "coffeelint config", config.coffeelint)) {
    validators.ifExistsFileExcludeWithRegexAndString(errors, "coffeelint.exclude", config.coffeelint, config.watch.sourceDir);
    validators.ifExistsIsObject(errors, "coffeelint.rules", config.coffeelint.rules);
  }
  return errors;
};
