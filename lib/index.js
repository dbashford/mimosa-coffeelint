"use strict";
var coffeelint, config, logger, registration, _coffeelint, _log;

coffeelint = require('coffeelint');

logger = require('logmimosa');

config = require('./config');

registration = function(mimosaConfig, register) {
  var coffeeExts, _ref, _ref1;
  coffeeExts = (_ref = (_ref1 = mimosaConfig.coffeescript) != null ? _ref1.extensions : void 0) != null ? _ref : ["coffee", "litcoffee"];
  return register(['add', 'update', 'buildFile'], 'betweenReadCompile', _coffeelint, coffeeExts);
};

_coffeelint = function(mimosaConfig, options, next) {
  var _this = this;
  if (options.files != null) {
    options.files.forEach(function(file) {
      var lintErrors;
      if ((mimosaConfig.coffeelint.exclude != null) && mimosaConfig.coffeelint.exclude.indexOf(file.inputFileName) !== -1) {
        return;
      }
      if ((mimosaConfig.coffeelint.excludeRegex != null) && file.inputFileName.match(mimosaConfig.coffeelint.excludeRegex)) {
        return;
      }
      lintErrors = coffeelint.lint(file.inputFileText, mimosaConfig.coffeelint.rules);
      return lintErrors.forEach(function(err) {
        return _log(file.inputFileName, err);
      });
    });
  }
  return next();
};

_log = function(fileName, err) {
  var message;
  message = "CoffeeLint Error: " + err.message + ", in file [[ " + fileName + " ]]";
  if (err.lineNumber) {
    message += ", at line number [[ " + err.lineNumber + " ]]";
  }
  if (err.context) {
    message += ", context [[ " + err.lineNumber + " ]]";
  }
  return logger.warn(message);
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
