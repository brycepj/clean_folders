module.exports = log;
var io = $require('lib/io');

function log(cfg) {

	io.ensureLog().then(function() {
		io.logText(stringifyLog(cfg));
	})
}

function stringifyLog(json) {
	return JSON.stringify(json);
}