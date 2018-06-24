// Assignment: Access the file server (port 8081) by injecting `userDefinedUrl`
// Please leverage the curl execution context
// Bonus: View the contents of `sensitive-file.txt` within the file server's
// current working directory

var userDefinedUrl = 'example.com/route';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=1 docker-compose up"
// File: "ep10-injection-fundamentals-part-2/src/1/app.js"
