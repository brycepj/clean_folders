module.exports = email;

var io = $require('lib/io');
var nodemailer = require('nodemailer');
var _ = require('lodash');

function email(cfg) {
	var html = '';
	
	var date = new Date().toString();
	html += '<p>' + date + '</p>';
	
	_.forEach(cfg, function(obj) {

		html += makeTitle(obj.name, obj.base_path);

		if (obj.file_paths.length > 0) {
			html += '<ul>'
			_.forEach(obj.file_paths, function(path) {
				html += '<li>' + path + '</li>';
			})
			html += '</ul>'
		} else {
			html += '<i>no files moved to trash</i>'
		}
	});

	io.getGmailPassword().then(function(pw) {
		
		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'brycepj@gmail.com',
		        pass: pw
		    }
		});

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Your Thinkpad <brycepj@gmail.com>', // sender address
		    to: 'brycepj@gmail.com', // list of receivers
		    subject: 'Files moved to trash just now', // Subject line
		    html: html // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		});


	});
}

function makeTitle(name, base_path) {
	return '<h3>' + name + ' - ' + base_path + '</h3>';
}
