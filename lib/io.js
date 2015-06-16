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

var log_file_path = path.join(rootDir, '_dev/logs/trashed');

io.ensureLog = function() {
	return new Promise(function(resolve, reject) {
		fs.ensureFile(log_file_path, function(err) {
			if (err) reject(err);
			resolve()
		});
	});
}

io.logText = function(text) {
	return new Promise(function(resolve, reject) {
		fs.appendFile(log_file_path, text, 'utf8', function(err) {
			if (err) reject(err);
			resolve();
		});
	});
}