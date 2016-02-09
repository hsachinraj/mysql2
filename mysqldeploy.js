var path = require('path');
var tl = require('vso-task-lib');

var echo = new tl.ToolRunner(tl.which('echo', true));

var msg = tl.getInput('msg', true);
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

if (createdb){
        var mysqlcmd = 'mysql -u '+username+' --password='+password+' -e "create database '+dbname+'"';
        mysqlshell.arg(mysqlcmd);
mysqlcmd.exec()
.then(function (code) {
    // Executed successfully
    tl.setResult(tl.TaskResult.Succeeded, tl.loc('BashReturnCode', code));
})
.fail(function (err) {
    // Error executing
    tl.debug('ToolRunner execution failure: ' + err);
    tl.debug('Error creatinng db with command '+mysqlcmd);
    tl.exit(1);
})
}

var mysqlcmd = 'mysql -u '+username+' --password='+password+' -D '+dbname+' <'+scriptfile;
mysqlshell.arg(mysqlcmd);
mysqlcmd.exec()
.then(function (code) {
    // Executed successfully
    tl.setResult(tl.TaskResult.Succeeded, tl.loc('BashReturnCode', code));
})
.fail(function (err) {
    // Error executing
    tl.debug('ToolRunner execution failure: ' + err);
    tl.debug('Error Executing '+mysqlcmd);
    tl.exit(1);
})

}



