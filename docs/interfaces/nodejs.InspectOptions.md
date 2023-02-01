[css-in-console](../README.md) / [nodejs](../modules/nodejs.md) / InspectOptions

# Interface: InspectOptions

[nodejs](../modules/nodejs.md).InspectOptions

## Table of contents

### Properties

- [showHidden](nodejs.InspectOptions.md#showhidden)
- [depth](nodejs.InspectOptions.md#depth)
- [colors](nodejs.InspectOptions.md#colors)
- [customInspect](nodejs.InspectOptions.md#custominspect)
- [showProxy](nodejs.InspectOptions.md#showproxy)
- [maxArrayLength](nodejs.InspectOptions.md#maxarraylength)
- [maxStringLength](nodejs.InspectOptions.md#maxstringlength)
- [breakLength](nodejs.InspectOptions.md#breaklength)
- [compact](nodejs.InspectOptions.md#compact)
- [sorted](nodejs.InspectOptions.md#sorted)
- [getters](nodejs.InspectOptions.md#getters)
- [numericSeparator](nodejs.InspectOptions.md#numericseparator)

## Properties

### showHidden

• `Optional` **showHidden**: `boolean`

If `true`, object's non-enumerable symbols and properties are included in the formatted result.
`WeakMap` and `WeakSet` entries are also included as well as user defined prototype properties (excluding method properties).

**`Default`**

false

___

### depth

• `Optional` **depth**: `number`

Specifies the number of times to recurse while formatting object.
This is useful for inspecting large objects.
To recurse up to the maximum call stack size pass `Infinity` or `null`.

**`Default`**

2

___

### colors

• `Optional` **colors**: `boolean`

If `true`, the output is styled with ANSI color codes. Colors are customizable.

___

### customInspect

• `Optional` **customInspect**: `boolean`

If `false`, `[util.inspect.custom](depth, opts, inspect)` functions are not invoked.

**`Default`**

true

___

### showProxy

• `Optional` **showProxy**: `boolean`

If `true`, `Proxy` inspection includes the target and handler objects.

**`Default`**

false

___

### maxArrayLength

• `Optional` **maxArrayLength**: `number`

Specifies the maximum number of `Array`, `TypedArray`, `WeakMap`, and `WeakSet` elements
to include when formatting. Set to `null` or `Infinity` to show all elements.
Set to `0` or negative to show no elements.

**`Default`**

100

___

### maxStringLength

• `Optional` **maxStringLength**: `number`

Specifies the maximum number of characters to
include when formatting. Set to `null` or `Infinity` to show all elements.
Set to `0` or negative to show no characters.

**`Default`**

10000

___

### breakLength

• `Optional` **breakLength**: `number`

The length at which input values are split across multiple lines.
Set to `Infinity` to format the input as a single line
(in combination with `compact` set to `true` or any number >= `1`).

**`Default`**

80

___

### compact

• `Optional` **compact**: `number` \| `boolean`

Setting this to `false` causes each object key
to be displayed on a new line. It will also add new lines to text that is
longer than `breakLength`. If set to a number, the most `n` inner elements
are united on a single line as long as all properties fit into
`breakLength`. Short array elements are also grouped together. Note that no
text will be reduced below 16 characters, no matter the `breakLength` size.
For more information, see the example below.

**`Default`**

true

___

### sorted

• `Optional` **sorted**: `boolean` \| (`a`: `string`, `b`: `string`) => `number`

If set to `true` or a function, all properties of an object, and `Set` and `Map`
entries are sorted in the resulting string.
If set to `true` the default sort is used.
If set to a function, it is used as a compare function.

___

### getters

• `Optional` **getters**: `boolean` \| ``"set"`` \| ``"get"``

If set to `true`, getters are going to be
inspected as well. If set to `'get'` only getters without setter are going
to be inspected. If set to `'set'` only getters having a corresponding
setter are going to be inspected. This might cause side effects depending on
the getter function.

**`Default`**

false

___

### numericSeparator

• `Optional` **numericSeparator**: `boolean`

If set to `true`, an underscore is used to separate every three digits in all bigints and numbers.

**`Default`**

false
