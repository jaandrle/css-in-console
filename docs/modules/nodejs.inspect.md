[css-in-console](../README.md) / [nodejs](nodejs.md) / inspect

# Namespace: inspect

[nodejs](nodejs.md).inspect

## Table of contents

### Variables

- [colors](nodejs.inspect.md#colors)
- [styles](nodejs.inspect.md#styles)
- [defaultOptions](nodejs.inspect.md#defaultoptions)
- [replDefaults](nodejs.inspect.md#repldefaults)
- [custom](nodejs.inspect.md#custom)

## Variables

### colors

• **colors**: `NodeJS.Dict`<[`number`, `number`]\>

___

### styles

• **styles**: { [K in Style]: string }

___

### defaultOptions

• **defaultOptions**: [`InspectOptions`](../interfaces/nodejs.InspectOptions.md)

___

### replDefaults

• **replDefaults**: [`InspectOptions`](../interfaces/nodejs.InspectOptions.md)

Allows changing inspect settings from the repl.

___

### custom

• `Const` **custom**: unique `symbol`

That can be used to declare custom inspect functions.
