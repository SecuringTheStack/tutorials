// [[file:~/repos/sts-tutorials/injection-fundamentals-1/notes.org::EXECFILE][EXECFILE]]
var test
  var execFile = require('child_process').execFile;
  var user_defined_url = "example.com/callback";
  var curl = execFile("/usr/bin/curl", [user_defined_url]);
  curl.stdout.on('data', function(data) {
    console.log(data);
  });
// Visit %filename
// EXECFILE ends here
