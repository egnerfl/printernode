    var ftpd = require('ftpd');
    var fs = require('fs');
    var express = require('express');
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var config = require('./config.json');
    var execFile = require('child_process').execFile;
    var file_list = [];
    var p = "./printer";

    app.use(express.static(__dirname + '/webapp'));
    app.use('/printer', express.static(__dirname + '/printer'));

    var host = '0.0.0.0';
    var user = {
      'name': 'printer',
      'password': 'printer'
    };

    var options = {
      pasvPortRangeStart: 4000,
      pasvPortRangeEnd: 5000,
      getInitialCwd: function(connection, callback) {
        var userPath = process.cwd() + '/printer';
        fs.exists(userPath, function(exists) {
          exists ? callback(null, userPath) : callback('path does not exist', userPath);
        });
      },
      getRoot: function(user) {
        return '/';
      }
    };

    var server = new ftpd.FtpServer(host, options);

    server.on('client:connected', function(conn) {
      var username;
      console.log('Client connected from ' + conn.socket.remoteAddress);
      conn.on('command:user', function(user, success, failure) {
        username = user;
        (user == 'printer') ? success(): failure();
      });
      conn.on('command:pass', function(pass, success, failure) {
        // check the password
        (pass == 'printer') ? success(username): failure();
      });

      getFiles();
    });

    server.listen(21);
    console.log('FTPD listening on port 21');

    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

    function cleanArray(actual) {
      var newArray = new Array();
      for (var i = 0; i < actual.length; i++) {
        if (actual[i] != '' && !actual[i].endsWith('.DS_Store') && !actual[i].endsWith(p)) {
          newArray.push(actual[i].replace(p, ''));
        }
      }
      return newArray;
    }

    var getFiles = function() {

      execFile('find', [p], function(err, stdout, stderr) {
        file_list = cleanArray(stdout.split('\n'));
      });

    };

    http.listen(config.express_port, function() {
      console.log('listening on *:' + config.express_port);
    });

    io.on('connection', function(socket) {
      console.log("Client connected");
    });

    setInterval(function() {
      getFiles();

      io.emit("message", {
        type: 'file_list',
        message: file_list
      });

    }, 1000);