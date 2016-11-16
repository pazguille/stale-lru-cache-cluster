# Stale LRU Cache

> A promise-based Stale LRU Cache with support for cluster.

## Features

- A promise-based API.
- Support for cluster.
- Wrapper for [stale-lru-cache](github.com/cyberthom/stale-lru-cache) module.

## Installation

```
npm install --save stale-lru-cache-cluster
```

## Usage

```js
const LRUCache = require('stale-lru-cache-cluster');

const options = {
  maxSize: 100,
  maxAge: 600,
  staleWhileRevalidate: 86400,
  revalidate: function (key, callback) {
    fetchSomeAsyncData(callback);
  },
};

const cache = LRUCache(options);

cache.set('key', 'value');

cache.get('key').then((value) => {
  // 'value'
});
```

### Usage with cluster
1. Require ```stale-lru-cache-cluster``` in master process

  ```js
  require('stale-lru-cache-cluster');
  ```

2. In worker processes, require ```stale-lru-cache-cluster``` and use as follows:

  ```js
  const LRUCache = require('stale-lru-cache-cluster');

  const options = {
    maxSize: 100,
    maxAge: 600,
    staleWhileRevalidate: 86400,
    revalidate: function (key, callback) {
      fetchSomeAsyncData(callback);
    },
  };

  const cache = LRUCache(options);

  cache.set('key', 'value');

  cache.get('key').then((value) => {
    // 'value'
  });
  ```

## API

* [`Cache()`](#cacheoptions)
* [`.delete()`](#deletekey)
* [`.get()`](#getkey)
* [`.has()`](#haskey)
* [`.isStale()`](#isstalekey)
* [`.keys()`](#keys)
* [`.set()`](#setkeyvalueoptions)
* [`.size`](#size)
* [`.values()`](#values)


### `Cache(options)`

Creates and returns a new Cache instance.

##### Parameters

* `options.maxAge` - Time in seconds after which items will expire. *(default: Infinity)*
* `options.staleWhileRevalidate` - Time in seconds, after `maxAge` has expired, when items are marked as stale but still usable. *(default: 0)*
* `options.revalidate(key, callback(error, value, [options]))` - Function that refreshes items in the background after they become stale.
* `options.maxSize` - Maximum cache size. *(default: Infinity)*
* `options.getSize(value, key)` - Function used to calculate the length of each stored item. *(default: 1)*

### `delete(key)`

Removes the specified item from the cache.

Returns `true` if an item existed and has been removed, or `false` if the item does not exist.

```js
cache.delete('key').then((removed) => {
  // true or false
});
```

### `get(key)`

Returns the value associated with the specified key, or `undefined` if the item does not exist.

```js
cache.get('key').then((value) => {
  // 'value' or undefiend
});
```

### `has(key)`

Returns `true` if an item with the specified key exists (may be fresh or stale), or `false` otherwise.

```js
cache.has('key').then((exists) => {
  // true or false
});
```

### `isStale(key)`

Returns `true` if an item with the specified key exists and is stale, or `false` otherwise.

```js
cache.isStale('key').then((isStale) => {
  // true or false
});
```

### `keys()`

Returns an array with all keys stored in the cache.

```js
cache.keys().then((keys) => {
  // Array with all keys
});
```

### `set(key, value, [options])`

Inserts a new item with the specified `key` and `value`.

Returns `true` if the item has been inserted, or `false` otherwise.

```js
cache.set('key', 'value', options).then((inserted) => {
  // true or false
});
```

##### Parameters

* `key` - **Required.** The key of the item to be inserted. (both objects and primitives may be used)
* `value` - **Required.** The value of the item to be inserted. (both objects and primitives may be used)
* `options` - Item specific Cache-Control string or options object.
* `options.maxAge` - Time in seconds after which the item will expire.
* `options.staleWhileRevalidate` - Time in seconds, after `maxAge` has expired, when the item is marked as stale but still usable.
* `options.revalidate(key, callback(error, value, [options]))` - Function that refreshes the item in the background after it becomes stale.

##### Examples

```javascript
cache.set('key', 'value'); // true

cache.set('key', 'value', { maxAge: 600, staleWhileRevalidate: 86400 }); // true
cache.set('key', 'value', { maxAge: 0 }); // false

cache.set('key', 'value', 'max-age=600, stale-while-revalidate=86400'); // true
cache.set('key', 'value', 'no-cache, no-store, must-revalidate'); // false
```

##### Cache-Control Behaviour

* `max-age=600, must-revalidate` - Will be cached for 10 minutes and removed afterwards
* `max-age=600, stale-while-revalidate=86400` - Will be cached for 10 minutes and then refreshed in the background if the item is accessed again within a time window of 1 day
* `no-cache, no-store, must-revalidate` - Will not be cached
* `private` - Will not be cached
* `public` - Will be cached using default `maxAge` and `staleWhileRevalidate` options

### `size`

Property indicating the size of all stored items in the cache. This is calculated using `getSize` options function.

```js
cache.getSize().then((size) => {
  // size of all stored items in the cache
});
```

### `values()`

Returns an array with all values stored in the cache.

```js
cache.values().then((values) => {
  // values stored in the cache
});
```

## With :heart: by

- Guille Paz (Front-end developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)
- Original repo: [node-lru-cache-cluster](https://github.com/robby/node-lru-cache-cluster)

## License

MIT license. Copyright © 2016.
