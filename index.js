#! /usr/bin/node

global.$require = function(name) {
	return require(__dirname + '/' + name);
}

$require('lib/setup');

var _ = require('lodash');
var path = require('path');

var io = $require('lib/io');
var parseCfg = $require('lib/parse_config');
var trashFiles = $require('lib/trash_files');
var emailDeletions = $require('lib/email_deletions');

var cfg = io.readJson(path.join(srcDir, 'config.json'))
	.then(function(json) {
		log.info('cfg status', json);
		return parseCfg(json);
	})
	.then(function(data) {
		return trashFiles(data)
	})
	.then(function(data) {
		emailDeletions(data);
	});