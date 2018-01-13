// Make a PR and contribute your answers here!
// var userDefinedUrl = "example.com/route; pkill node";

var userDefinedUrl = 'example.com/route';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=2 docker-compose up"
// File: "injection-fundamentals-1/src/2/app.js"
// Env Setup/Error Reporting: https://sts.tools/readme
// Questions: https://sts.tools/injection-question
