// Import clusterws
const ClusterWS = require('clusterws')

// Configure ClusterWS
const clusterws = new ClusterWS({
    port: 3000, // specify port of the application
    worker: Worker // Worker function must be provided
    // All other configurations can be found at bottom of the page
})

function doohicky(val, cb) {
  if (val >= 50) {
    return;
  }
  else {
    setTimeout(function() {
      cb(val);
      doohicky(val+5, cb);
    }, 3000);
  }
}
// Worker function with all your server logic
function Worker() {
    // Get websocket server
    const wss = this.wss
    // Get http/https server
    const server = this.server

    // Listen on connections to websocket server
    wss.on('connection', (socket, req) => {
      console.log('connected!');
      doohicky(0, function (val) {
        socket.send('eventname', {'val': val});
      })
    })
}
