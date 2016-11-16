/**
 * Module dependencies
 */
const cluster = require('cluster');
const LRUCachePromised = require('./stale-lru-cache-promised');
const uuid = require('node-uuid');

const source = 'stale-lru-cache-cluster';
const pending = {};

if (cluster.isWorker) {
  process.on('message', function onWorkerMessage(msg) {
    if (msg.source !== source) {
      return;
    }
    const incoming = pending[msg.id];
    incoming.callback(msg);
    delete pending[msg.id];
  });
}

function sendRequest(namespace, cmd) {
  const callback = arguments[arguments.length - 1];
  const msg = {
    cmd,
    source,
    namespace,
    callback: callback,
    id: uuid.v4(),
    arguments: [].slice.call(arguments, 2, arguments.length - 1),
  };
  pending[msg.id] = msg;
  process.send && process.send(msg);
}

function LRUCache(options = {}) {
  if (!(this instanceof LRUCache)) {
    let instance;
    if (cluster.isMaster) {
      instance = new LRUCachePromised(options);
    } else {
      instance = new LRUCache(options);
    }
    return instance;
  }
  this.namespace = options.namespace || 'default';
  sendRequest(this.namespace, 'constructor', options, () => {});
};

LRUCache.prototype.delete = function(key) {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'delete', key, function(data) {
      resolve(data.response);
    });
  });
}

LRUCache.prototype.get = function(key) {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'get', key, function(data) {
      resolve(data.response);
    });
  });
}

LRUCache.prototype.has = function(key) {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'has', key, function(data) {
      resolve(data.response);
    });
  });
}

LRUCache.prototype.isStale = function(key) {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'isStale', key, function(data) {
      resolve(data.response);
    });
  });
}

LRUCache.prototype.keys = function() {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'keys', function(data) {
      resolve(data.response);
    });
  });
}

LRUCache.prototype.set = function(key, value, options) {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'set', key, value, options, function(data) {
      resolve(data.response);
    });
  });
}

LRUCache.prototype.size = function() {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'size', function(data) {
      resolve(data.response);
    });
  });
}

LRUCache.prototype.values = function() {
  return new Promise((resolve, reject) => {
    sendRequest(this.namespace, 'values', function(data) {
      resolve(data.response);
    });
  });
}

/**
 * Expose LRUCache
 */
module.exports = LRUCache;
