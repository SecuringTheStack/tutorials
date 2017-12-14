var execFile = require('child_process').execFile; 
var user_defined_url = "example.com/callback";
var curl = execFile("/usr/bin/curl", [user_defined_url]);
curl.stdout.on('data', function(data) {
  console.log(data);
});
