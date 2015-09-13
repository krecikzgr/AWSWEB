var INDEX_TEMPLATE = "editImage.ejs";

var APP_CONFIG_FILE = "./app.json";
var helpers = require("../helpers");


var url = require('url');
var AWS = require('aws-sdk');

var task = function(request, callback){				

	var sqs = new AWS.SQS();
	
	var reqShowImage = request.url;		
	var imageInds = reqShowImage.lastIndexOf("/") + 1;
	var filename = reqShowImage.substr(imageInds);
	
	var appConfig = helpers.readJSONFile(APP_CONFIG_FILE);
	
	params = {
		MessageBody: filename,
		QueueUrl: appConfig.QueueUrl,
		DelaySeconds: 0
	};		
	
	sqs.sendMessage(params, function(err, data) {
		if (err) {			
			console.log(err, err.stack);
				callback(null, {template: INDEX_TEMPLATE});
		}
		else {
			console.log(data);
				callback(null, {template: INDEX_TEMPLATE, params:{data: params}});
		}
	});
	
}

exports.action = task;
