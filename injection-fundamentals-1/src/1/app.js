// Assignment: Kill the node process by entering data into `userDefinedUrl`
// Assume that the commands are being executed within a bash shell
var userDefinedUrl = 'example.com/route ; pkill node';
// Allow shell access
var exec = require('child_process').exec;
var curl = exec('curl ' + userDefinedUrl);
curl.stdout.on('data', function(data) {
  // Mock response
  console.log(data);
});
// Run: "EX_NUM=1 docker-compose up"
// File: "injection-fundamentals-1/src/1/app.js"
// Env Setup/Error Reporting: https://sts.tools/readme
// Questions: https://sts.tools/injection-question
