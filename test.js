
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const LRUCache = require('./index');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const LRUCache = require('./index');
  const cache = LRUCache();
  cache.set('foo', 123);

  setTimeout(()=> {
    cache.has('foo')
      .then(response => console.log(response));

    cache.get('foo')
      .then(response => console.log(response));
  }, 2000);
}
