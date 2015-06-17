module.exports = trash_files;
var _ = require('lodash');
var Promise = require('bluebird');
var path = require('path');

var io = $require('lib/io');

function trash_files(cfg) {
	var promises = [];

	_.forEach(cfg, function(dir) {
		_.forEach(dir.file_paths, function(file_path) {
			var promise = io.trashFile(path.join(dir.base_path, file_path));
			promises.push(promise);
		});
	});

	return Promise.all(promises).then(function() {
		log.info('Files trashed succesfully.');
		return cfg;
	});
}