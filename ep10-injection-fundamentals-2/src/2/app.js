// Make a PR and contribute your answers here!
// var userDefinedUrl = "localhost:8081/sensitive-file.txt";

var userDefinedUrl = 'example.com/route';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=2 docker-compose up"
// File: "injection-fundamentals-2/src/2/app.js"
