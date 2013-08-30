"use strict"

exports.defaults = ->
  coffeelint:
    exclude:[]
    rules:{}

exports.placeholder = ->
  """
  \t

    # coffeelint:              # Configuration for coffeelint module
      # exclude:[]             # array of strings or regexes that match files to not coffeelint,
                               # strings are paths that can be relative to the watch.compiledDir
                               # or absolute
      # rules:{}               # Rule overrides for the coffeelint module. Rule definitions can be
                               # be found at http://www.coffeelint.org/#options
  """

exports.validate = (config, validators) ->
  errors = []
  if validators.ifExistsIsObject(errors, "coffeelint config", config.coffeelint)
    validators.ifExistsFileExcludeWithRegexAndString(errors, "coffeelint.exclude", config.coffeelint, config.watch.sourceDir)
    validators.ifExistsIsObject(errors, "coffeelint.rules", config.coffeelint.rules)

  errors
