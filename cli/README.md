asdf
====

a strange productivity tool right in your terminal

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/asdf.svg)](https://npmjs.org/package/asdf)
[![Downloads/week](https://img.shields.io/npm/dw/asdf.svg)](https://npmjs.org/package/asdf)
[![License](https://img.shields.io/npm/l/asdf.svg)](https://github.com/cembreyfarquhar/asdf/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g asdf
$ asdf COMMAND
running command...
$ asdf (-v|--version|version)
asdf/0.0.0 darwin-x64 node-v14.2.0
$ asdf --help [COMMAND]
USAGE
  $ asdf COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`asdf autocomplete [SHELL]`](#asdf-autocomplete-shell)
* [`asdf createPeriodicTask [FILE]`](#asdf-createperiodictask-file)
* [`asdf decrypt [FILE]`](#asdf-decrypt-file)
* [`asdf delete:everything [FILE]`](#asdf-deleteeverything-file)
* [`asdf encrypt [FILE]`](#asdf-encrypt-file)
* [`asdf generateKey [FILE]`](#asdf-generatekey-file)
* [`asdf hello [FILE]`](#asdf-hello-file)
* [`asdf help [COMMAND]`](#asdf-help-command)
* [`asdf login [FILE]`](#asdf-login-file)
* [`asdf register [FILE]`](#asdf-register-file)
* [`asdf todo [FILE]`](#asdf-todo-file)
* [`asdf todo:new [FILE]`](#asdf-todonew-file)
* [`asdf todo:show [FILE]`](#asdf-todoshow-file)

## `asdf autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ asdf autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ asdf autocomplete
  $ asdf autocomplete bash
  $ asdf autocomplete zsh
  $ asdf autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `asdf createPeriodicTask [FILE]`

describe the command here

```
USAGE
  $ asdf createPeriodicTask [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/createPeriodicTask.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/createPeriodicTask.ts)_

## `asdf decrypt [FILE]`

describe the command here

```
USAGE
  $ asdf decrypt [FILE]

OPTIONS
  -f, --force
  -h, --help     show CLI help
  -h, --hex=hex  encrypted hex
```

_See code: [src/commands/decrypt.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/decrypt.ts)_

## `asdf delete:everything [FILE]`

describe the command here

```
USAGE
  $ asdf delete:everything [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/delete/everything.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/delete/everything.ts)_

## `asdf encrypt [FILE]`

describe the command here

```
USAGE
  $ asdf encrypt [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -t, --text=text  text to encrypt
```

_See code: [src/commands/encrypt.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/encrypt.ts)_

## `asdf generateKey [FILE]`

describe the command here

```
USAGE
  $ asdf generateKey [FILE]

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -s, --save
```

_See code: [src/commands/generateKey.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/generateKey.ts)_

## `asdf hello [FILE]`

describe the command here

```
USAGE
  $ asdf hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ asdf hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/hello.ts)_

## `asdf help [COMMAND]`

display help for asdf

```
USAGE
  $ asdf help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.1/src/commands/help.ts)_

## `asdf login [FILE]`

describe the command here

```
USAGE
  $ asdf login [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/login.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/login.ts)_

## `asdf register [FILE]`

describe the command here

```
USAGE
  $ asdf register [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/register.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/register.ts)_

## `asdf todo [FILE]`

describe the command here

```
USAGE
  $ asdf todo [FILE]

OPTIONS
  -h, --help  show CLI help
  -n, --new
```

_See code: [src/commands/todo.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/todo.ts)_

## `asdf todo:new [FILE]`

describe the command here

```
USAGE
  $ asdf todo:new [FILE]

OPTIONS
  -h, --help       show CLI help
  -l, --list=list
  -t, --task=task
```

_See code: [src/commands/todo/new.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/todo/new.ts)_

## `asdf todo:show [FILE]`

describe the command here

```
USAGE
  $ asdf todo:show [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/todo/show.ts](https://github.com/cembreyfarquhar/asdf/blob/v0.0.0/src/commands/todo/show.ts)_
<!-- commandsstop -->
