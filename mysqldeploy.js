var path = require('path');
var tl = require('vso-task-lib');

var echo = new tl.ToolRunner(tl.which('echo', true));

var dbname = tl.getInput('dbname', true);
var username = tl.getInput('username', true);
var password = tl.getInput('password', true);
var createdb = tl.getBoolInput('createdb', true);
var scriptfile = tl.getPathInput('scriptfile', false);

dbname = dbname.trim();
username = username.trim();
password = password.trim();

// Define error handler
var onError = function (errorMsg) {
    tl.error(errorMsg);
    tl.exit(1);
   // echo (errorMsg);
}
var mysqlshell = tl.createToolRunner(tl.which('bash', true));

//If database needs to be created, create the DB first
//currently there is no check to see if DB already exists
if (createdb)
{
        var mysqlcmd = 'mysql -u '+username+' --password='+password+' -e \'create database '+dbname+'\'';
        var sys = require('sys')
var exec = require('child_process').exec;
var child;
// create the database
child = exec(mysqlcmd, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
        
}

var mysqlcmd2 = 'mysql -u '+username+' --password='+password+' -D '+dbname+' <'+scriptfile;
var sys = require('sys')
var exec = require('child_process').exec;
var child;
// execute the SQL Script using MySQL CMD
child = exec(mysqlcmd2, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});


