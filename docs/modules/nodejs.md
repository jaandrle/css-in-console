[css-in-console](../README.md) / nodejs

# Namespace: nodejs

Contains all internally used types (functions, …) from nodejs packages.

## Table of contents

### Functions

- [format](nodejs.md#format)
- [formatWithOptions](nodejs.md#formatwithoptions)
- [inspect](nodejs.md#inspect)
- [log](nodejs.md#log)
- [error](nodejs.md#error)

### Namespaces

- [inspect](nodejs.inspect.md)

### Interfaces

- [InspectOptions](../interfaces/nodejs.InspectOptions.md)

## Functions

### format

▸ **format**(`format?`, `...param`): `string`

The `util.format()` method returns a formatted string using the first argument
as a `printf`\-like format string which can contain zero or more format
specifiers. Each specifier is replaced with the converted value from the
corresponding argument. Supported specifiers are:

If a specifier does not have a corresponding argument, it is not replaced:

```js
util.format('%s:%s', 'foo');
// Returns: 'foo:%s'
```

Values that are not part of the format string are formatted using`util.inspect()` if their type is not `string`.

If there are more arguments passed to the `util.format()` method than the
number of specifiers, the extra arguments are concatenated to the returned
string, separated by spaces:

```js
util.format('%s:%s', 'foo', 'bar', 'baz');
// Returns: 'foo:bar baz'
```

If the first argument does not contain a valid format specifier, `util.format()`returns a string that is the concatenation of all arguments separated by spaces:

```js
util.format(1, 2, 3);
// Returns: '1 2 3'
```

If only one argument is passed to `util.format()`, it is returned as it is
without any formatting:

```js
util.format('%% %s');
// Returns: '%% %s'
```

`util.format()` is a synchronous method that is intended as a debugging tool.
Some input values can have a significant performance overhead that can block the
event loop. Use this function with care and never in a hot code path.

**`Since`**

v0.5.3

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `format?` | `any` | A `printf`-like format string. |
| `...param` | `any`[] | - |

#### Returns

`string`

___

### formatWithOptions

▸ **formatWithOptions**(`inspectOptions`, `format?`, `...param`): `string`

This function is identical to [format](nodejs.md#format), except in that it takes
an `inspectOptions` argument which specifies options that are passed along to [inspect](nodejs.md#inspect).

```js
util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 });
// Returns 'See object { foo: 42 }', where `42` is colored as a number
// when printed to a terminal.
```

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `inspectOptions` | [`InspectOptions`](../interfaces/nodejs.InspectOptions.md) |
| `format?` | `any` |
| `...param` | `any`[] |

#### Returns

`string`

___

### inspect

▸ **inspect**(`object`, `showHidden?`, `depth?`, `color?`): `string`

The `util.inspect()` method returns a string representation of `object` that is
intended for debugging. The output of `util.inspect` may change at any time
and should not be depended upon programmatically. Additional `options` may be
passed that alter the result.`util.inspect()` will use the constructor's name and/or `@@toStringTag` to make
an identifiable tag for an inspected value.

```js
class Foo {
  get [Symbol.toStringTag]() {
    return 'bar';
  }
}

class Bar {}

const baz = Object.create(null, { [Symbol.toStringTag]: { value: 'foo' } });

util.inspect(new Foo()); // 'Foo [bar] {}'
util.inspect(new Bar()); // 'Bar {}'
util.inspect(baz);       // '[foo] {}'
```

Circular references point to their anchor by using a reference index:

```js
const { inspect } = require('util');

const obj = {};
obj.a = [obj];
obj.b = {};
obj.b.inner = obj.b;
obj.b.obj = obj;

console.log(inspect(obj));
// <ref *1> {
//   a: [ [Circular *1] ],
//   b: <ref *2> { inner: [Circular *2], obj: [Circular *1] }
// }
```

The following example inspects all properties of the `util` object:

```js
const util = require('util');

console.log(util.inspect(util, { showHidden: true, depth: null }));
```

The following example highlights the effect of the `compact` option:

```js
const util = require('util');

const o = {
  a: [1, 2, [[
    'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do ' +
      'eiusmod \ntempor incididunt ut labore et dolore magna aliqua.',
    'test',
    'foo']], 4],
  b: new Map([['za', 1], ['zb', 'test']])
};
console.log(util.inspect(o, { compact: true, depth: 5, breakLength: 80 }));

// { a:
//   [ 1,
//     2,
//     [ [ 'Lorem ipsum dolor sit amet,\nconsectetur [...]', // A long line
//           'test',
//           'foo' ] ],
//     4 ],
//   b: Map(2) { 'za' => 1, 'zb' => 'test' } }

// Setting `compact` to false or an integer creates more reader friendly output.
console.log(util.inspect(o, { compact: false, depth: 5, breakLength: 80 }));

// {
//   a: [
//     1,
//     2,
//     [
//       [
//         'Lorem ipsum dolor sit amet,\n' +
//           'consectetur adipiscing elit, sed do eiusmod \n' +
//           'tempor incididunt ut labore et dolore magna aliqua.',
//         'test',
//         'foo'
//       ]
//     ],
//     4
//   ],
//   b: Map(2) {
//     'za' => 1,
//     'zb' => 'test'
//   }
// }

// Setting `breakLength` to e.g. 150 will print the "Lorem ipsum" text in a
// single line.
```

The `showHidden` option allows [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) and
[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) entries to be
inspected. If there are more entries than `maxArrayLength`, there is no
guarantee which entries are displayed. That means retrieving the same [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) entries twice may
result in different output. Furthermore, entries
with no remaining strong references may be garbage collected at any time.

```js
const { inspect } = require('util');

const obj = { a: 1 };
const obj2 = { b: 2 };
const weakSet = new WeakSet([obj, obj2]);

console.log(inspect(weakSet, { showHidden: true }));
// WeakSet { { a: 1 }, { b: 2 } }
```

The `sorted` option ensures that an object's property insertion order does not
impact the result of `util.inspect()`.

```js
const { inspect } = require('util');
const assert = require('assert');

const o1 = {
  b: [2, 3, 1],
  a: '`a` comes before `b`',
  c: new Set([2, 3, 1])
};
console.log(inspect(o1, { sorted: true }));
// { a: '`a` comes before `b`', b: [ 2, 3, 1 ], c: Set(3) { 1, 2, 3 } }
console.log(inspect(o1, { sorted: (a, b) => b.localeCompare(a) }));
// { c: Set(3) { 3, 2, 1 }, b: [ 2, 3, 1 ], a: '`a` comes before `b`' }

const o2 = {
  c: new Set([2, 1, 3]),
  a: '`a` comes before `b`',
  b: [2, 3, 1]
};
assert.strict.equal(
  inspect(o1, { sorted: true }),
  inspect(o2, { sorted: true })
);
```

The `numericSeparator` option adds an underscore every three digits to all
numbers.

```js
const { inspect } = require('util');

const thousand = 1_000;
const million = 1_000_000;
const bigNumber = 123_456_789n;
const bigDecimal = 1_234.123_45;

console.log(thousand, million, bigNumber, bigDecimal);
// 1_000 1_000_000 123_456_789n 1_234.123_45
```

`util.inspect()` is a synchronous method intended for debugging. Its maximum
output length is approximately 128 MB. Inputs that result in longer output will
be truncated.

**`Since`**

v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `any` | Any JavaScript primitive or `Object`. |
| `showHidden?` | `boolean` | - |
| `depth?` | `number` | - |
| `color?` | `boolean` | - |

#### Returns

`string`

The representation of `object`.

▸ **inspect**(`object`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |
| `options?` | [`InspectOptions`](../interfaces/nodejs.InspectOptions.md) |

#### Returns

`string`

___

### log

▸ **log**(`...data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...data` | `any`[] |

#### Returns

`void`

▸ **log**(`message?`, `...optionalParams`): `void`

Prints to `stdout` with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).

```js
const count = 5;
console.log('count: %d', count);
// Prints: count: 5, to stdout
console.log('count:', count);
// Prints: count: 5, to stdout
```

See `util.format()` for more information.

**`Since`**

v0.1.100

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalParams` | `any`[] |

#### Returns

`void`

___

### error

▸ **error**(`...data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...data` | `any`[] |

#### Returns

`void`

▸ **error**(`message?`, `...optionalParams`): `void`

Prints to `stderr` with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).

```js
const code = 5;
console.error('error #%d', code);
// Prints: error #5, to stderr
console.error('error', code);
// Prints: error 5, to stderr
```

If formatting elements (e.g. `%d`) are not found in the first string then `util.inspect()` is called on each argument and the resulting string
values are concatenated. See `util.format()` for more information.

**`Since`**

v0.1.100

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalParams` | `any`[] |

#### Returns

`void`
