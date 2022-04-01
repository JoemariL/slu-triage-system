const cluster = require("cluster");
const os = require("os");
const numCpu = os.cpus().length

// UTIL FUNCTION THAT UTILIZES MULTI-CORE PROCESSING.
module.exports = function(INPUT_FUNCTION){
  if (cluster.isMaster) {
    for(let i = 0; i < numCpu; i++){
      cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
      cluster.fork()
    })
  } else {
    INPUT_FUNCTION(cluster.worker.id)
  }
}


