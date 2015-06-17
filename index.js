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
	.then(function(data) {
		return emailDeletions(data);
	})
	.catch(function(err) {
		throw err;
	});
