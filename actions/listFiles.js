var util = require("util");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;

var AWS_CONFIG_FILE = "config.json";

var AWS = require('aws-sdk');


var S3Form = require("../s3post").S3Form;
AWS.config.loadFromPath(AWS_CONFIG_FILE);

var POLICY_FILE = "policy.json";
var INDEX_TEMPLATE = "imageList.ejs";


var tempBucket = new AWS.S3();
	
	
	
	
var task = function(request, callback){	
	
	var tempBUcketName = new Policy(helpers.readJSONFile(POLICY_FILE)).getConditionValueByKey("bucket");
callParameters = {
			Bucket: tempBUcketName	
	};
	tempBucket.listObjects(callParameters, function(err, data) {
		if (err) {
			console.log(err, err.stack);
		}
		else {
			callback(null, {template: INDEX_TEMPLATE, params:{fileList: data.Contents, bucket: callParameters.Bucket}});
		}
				});
	
}



exports.action = task;
