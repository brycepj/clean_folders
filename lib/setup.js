var bunyan = require('bunyan');
var path = require('path');

var rootDir = global.rootDir = '/home/bryce/';
var srcDir = global.srcDir = process.cwd();


var log = global.log = bunyan.createLogger({
	name: "clean_selected_folders", 
	streams: [
		{path: path.join(srcDir, './log.txt')},
		{stream: process.stdout}
	]
});

log.info('Begin folder clean.');
