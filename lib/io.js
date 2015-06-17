var Promise = require("bluebird");
var fs = require("fs-extra");
var path = require('path');
var io = module.exports;
require('shelljs/global');

io.readJson = function(path) {
	return new Promise(function(resolve, reject) {
		fs.readJson(path, function(err, json) {
			if (err) reject(err); 
			resolve(json);
		});
	});
}

io.readdir = function (dir_path) {
	return new Promise(function(resolve, reject) {
		fs.readdir(dir_path, function(err, data) {
			if (err) reject(err);
			resolve(data);
		})
	})
}

io.trashFile = function(oldPath) {
	return new Promise(function(resolve, reject) {
		var execStr = 'trash-put ' + oldPath; 
		exec(execStr, function() {
			resolve();
		})
	});
}

io.getGmailPassword = function() {
	return new Promise(function(resolve,reject) {
		fs.readFile(path.join(srcDir, 'gma.txt'), 'utf8', function(err, pw) {
			if (err) reject(err);
			resolve(pw);
		})
	})
}