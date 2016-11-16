/**
 * Module dependencies
 */
const LRUCache = require('stale-lru-cache');

/**
 * LRUCachePromised
 */
class LRUCachePromised {
  constructor(options = {}) {
    this.lru = new LRUCache(options);
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      const res = this.lru.delete(key);
      resolve(res);
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      const res = this.lru.get(key);
      resolve(res);
    });
  }

  has(key) {
    return new Promise((resolve, reject) => {
      const res = this.lru.has(key);
      resolve(res);
    });
  }

  isStale(key) {
    return new Promise((resolve, reject) => {
      const res = this.lru.isStale(key);
      resolve(res);
    });
  }

  keys() {
    return new Promise((resolve, reject) => {
      const res = this.lru.keys();
      resolve(res);
    });
  }

  set(key, value, options) {
    return new Promise((resolve, reject) => {
      const res = this.lru.set(key, value, options);
      resolve(res);
    });
  }

  size()  {
    return new Promise((resolve, reject) => {
      const res = this.lru.size;
      resolve(res);
    });
  }

  values() {
    return new Promise((resolve, reject) => {
      const res = this.lru.values();
      resolve(res);
    });
  }
}

/**
 * Expose LRUCachePromised
 */
module.exports = LRUCachePromised;
