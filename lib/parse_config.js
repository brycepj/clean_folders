module.exports = parse;
var _ = require('lodash');
var Promise = require('bluebird');

var path = require('path');
var io = $require('lib/io');

function parse(cfg) {

	var arr = [];
	var promises = [];

	_.forEach(cfg.dirs,function(dir) {
		var obj = {};
		var name = obj.name = dir.name;
		var dir_path = obj.base_path = path.join(rootDir, dir.path);	
		arr.push(obj);

		var promise = io.readdir(dir_path);
		promises.push(promise);
	});

	var allReadDirs = Promise.all(promises);

	return allReadDirs.then(function(data) {
		_.forEach(arr,function(set, idx) {
			arr[idx].file_paths = data[idx];	
		});
		return arr;
	});
}