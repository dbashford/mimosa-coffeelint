"use strict"

coffeelint = require 'coffeelint'

config = require './config'

logger = null

registration = (mimosaConfig, register) ->
  logger = mimosaConfig.log

  coffeeExts = mimosaConfig.coffeescript?.extensions ? ["coffee", "litcoffee"]
  register ['add','update','buildFile'], 'betweenReadCompile', _coffeelint, coffeeExts

_coffeelint = (mimosaConfig, options, next) ->
  if options.files?
    options.files.forEach (file) ->
      return if mimosaConfig.coffeelint.exclude?      and mimosaConfig.coffeelint.exclude.indexOf(file.inputFileName) isnt -1
      return if mimosaConfig.coffeelint.excludeRegex? and file.inputFileName.match(mimosaConfig.coffeelint.excludeRegex)
      lintErrors = coffeelint.lint file.inputFileText, mimosaConfig.coffeelint.rules
      lintErrors.forEach (err) ->
        _log file.inputFileName, err

  next()

_log = (fileName, err) ->
  message = "CoffeeLint Error: #{err.message}, in file [[ #{fileName} ]]"
  message += ", at line number [[ #{err.lineNumber} ]]" if err.lineNumber
  message += ", context [[ #{err.lineNumber} ]]" if err.context
  logger.warn message

module.exports =
  registration:    registration
  defaults:        config.defaults
  placeholder:     config.placeholder
  validate:        config.validate