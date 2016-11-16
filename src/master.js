/**
 * Module dependencies
 */
const cluster = require('cluster');
const LRUCachePromised = require('./stale-lru-cache-promised');

const caches = {};
const source = 'stale-lru-cache-cluster';
const methods = [
  'delete', 'get', 'has', 'isStale',
  'keys', 'set', 'size', 'values',
];

if (cluster.isMaster) {
  cluster.on('fork', (worker) => {
    worker.on('message', (msg) => {
      if (msg.source !== source) {
        return;
      }

      let lru = caches[msg.namespace];

      function sendResponse(data){
        data.source = source;
        data.namespace = lru.namespace;
        data.id = msg.id;
        worker.send(data);
      }

      const switcheroo = {
        constructor: function(options) {
          lru = caches[msg.namespace] = new LRUCachePromised();
          lru.namespace = msg.namespace;
          sendResponse({ cmd: 'constructor' });
        },
      };

      methods.forEach(method => {
        switcheroo[method] = function(args) {
          lru[method](args[0], args[1], args[2])
            .then(response => sendResponse({ response, cmd: method }));
        };
      });

      msg.cmd && switcheroo[msg.cmd] && switcheroo[msg.cmd](msg.arguments);
    });
  });
}

/**
 * Expose LRUCacheProxy
 */
module.exports = require('./workers');
