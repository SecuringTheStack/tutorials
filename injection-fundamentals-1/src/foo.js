var exec = require('child_process').exec;
var user_defined_url = "example.com/callback";
var curl = exec("curl " + user_defined_url);
curl.stdout.on('data', function(data) {
  console.log(data);
});
