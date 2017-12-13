const cluster = require('cluster');

function waitms(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve => resolve(), ms, resolve);
  });
}


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  const worker = cluster.fork();

  waitms(5000)
    .then(() => {
      worker.disconnect();
      timeout = setTimeout(() => {
        worker.kill();
      }, 1000);
    });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {

  function tick() {
    console.log('.');
  }

  console.log(`Worker ${cluster.worker.id} is running`);
  setInterval(() => tick(), 1000);

}
