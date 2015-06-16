#! /usr/bin/node

global.$require = function(name) {
	return require(__dirname + '/' + name);
}

var rootDir = global.rootDir = '/home/bryce/';
var srcDir = global.srcDir = process.cwd();

var _ = require('lodash');
var path = require('path');

var io = $require('lib/io');
var parseCfg = $require('lib/parse_config');
var trashFiles = $require('lib/trash_files');
var logDeletions = $require('lib/log_deletions');
var emailDeletions = $require('lib/email_deletions');


var log, email; 

var cfg = io.readJson(path.join(srcDir, 'config.json'))
	.then(function(json) {
		return parseCfg(json);
	})
	.then(function(data) {
		return trashFiles(data)
	})
	.then(function(data) {
		return logDeletions(data);
	})
/*	.then(function(data) {
		return emailDeletions(data);
	})*/
	.catch(function(err) {
		throw err;
	})
	.finally(function() {
		console.log('it is finished\n\n');
	});




/*

- Take a list from a JSON file of folders that I want to globbing patterns. 
- Loop through the list executing a function that does the logging and the moving to the trash
- Log them to a file in the logs file
- Send a summary email to your email saying what was trashed and when it will be permanently 
	deleted, along with a list of everything that is in the trash

*/