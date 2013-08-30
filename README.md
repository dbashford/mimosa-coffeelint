mimosa-coffeelint
===========
## Overview

This is a coffeelinting module for Mimosa. Use this module to run your coffeescript files through a linting process that will check them for idiomatic use of the language.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `"coffeelint"` to your list of modules.  That's all!  Mimosa will install the module for you when you start up.

## Functionality

When mimosa-coffeelint encounters a coffeescript file, it lints it! This occurs when Mimosa first starts up and when coffeescript files are added or updated.

## Default Config

```coffeescript
coffeelint:
  exclude:[]
  rules:{}
```

* `exclude`: array of strings or regexes that match files to not coffeelint, strings are paths that can be relative to the `watch.compiledDir` or absolute.
* `rules`: Rule overrides for the coffeelint module. Rule definitions can be be found at http://www.coffeelint.org/#options.


## Example Config

```coffeescript
coffeelint:
  rules:
    "max_line_length":
      value: 100
      level: "error"
```

This will change the line length to 100.