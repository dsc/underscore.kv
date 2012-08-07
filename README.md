# underscore.kv

Key-value pairs serialization (aka, `www-form-encoding`) of objects for [Underscore.js][underscore].


## Usage

For usage in [node.js][node], install it via [npm][npm]: `npm install underscore.kv`.

You can use `underscore.kv` as a stand-alone library, though it depends on Underscore. 
Most people mix it into the Underscore namespace, which gains you the chaining wrappers.

```js
// standalone
var _kv = require('underscore.kv');

// mixin
var _ = require('underscore');
_.mixin require('underscore.kv');
```


## API

### _.**toKV**(*object*[, *item_delim*='&'[, *kv_delim*='=']])

Transforms an object to a string of URL-encoded KV-pairs (aka "www-form-encoding").
You may optionally override the delimiter inserted between items (`&` by default),
or the delimiter inserted between keys and values (`=`).

Note:
- All values end up as a string, implying all type information is lost.
- Both keys and values are URL-encoded once.

```js
_.toKV({ "foo":"bar", "feh":1, "lol":true })
// --> "foo=bar&feh=1&lol=true"
```


### _.**fromKV**(*string*[, *item_delim*=`'&'`[, *kv_delim*=`'='`]])

Restores an object from a string of URL-encoded KV-pairs (aka "www-form-encoding").
You may optionally override the delimiter inserted between items (`&` by default),
or the delimiter inserted between keys and values (`=`).

Note:
- All resulting values will be strings as all type information is lost.
- Both keys and values will be URL-decoded once.

```js
_.fromKV("foo=bar&feh=1&lol=true")
// --> { "foo":"bar", "feh":"1", "lol":"true" }
```


### _.**collapseObject**(*source*[, *target*=`{}`[, *prefix*=`''`]])

Copies and flattens a tree of sub-objects into namespaced keys on the target object.

```js
_.collapseObject({ "foo":{ "bar":1 } })
// --> { "foo.bar":1 }
```


### _.**uncollapseObject**(*source*[, *target*=`{}`])

Inverse of `_.collapseObject()` &mdash; copies all keys onto the target object,
expanding any dot-namespaced keys found.

```js
_.uncollapseObject({ "foo.bar":1 })
// --> { "foo":{ "bar":1 } }
```



## Feedback

Find a bug or want to contribute? Open a ticket (or fork the source!) on [github][project]. 
You're also welcome to send me email at [dsc@less.ly][dsc_email].

--

`underscore.kv` was written by [David Schoonover][dsc]; it is open-source software and freely available under the [MIT License][mit_license].



[project]: http://github.com/dsc/underscore.kv "underscore.kv on GitHub"
[dsc]: https://github.com/dsc/ "David Schoonover"
[dsc_email]: mailto:dsc+underscore.kv@less.ly?subject=underscore.kv "dsc@less.ly"
[mit_license]: http://dsc.mit-license.org/ "MIT License"

[node]: http://nodejs.org/ "node.js"
[npm]: http://npmjs.org/ "npm"
[underscore]: http://underscorejs.org "Underscore.js"
