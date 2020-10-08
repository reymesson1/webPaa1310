var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');
var bcrypt = require('bcrypt-nodejs');
var AWS = require('aws-sdk');

var albumBucketName = "youtube-project-2";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:3dd5b3b8-326c-4be6-9f32-67943932637a";

exports.getBucket = async(req,res)=>{

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: albumBucketName }
    });

    s3.listObjects({ Delimiter: "/assets" }, function(err, data) {

        if (err) {
            return alert("There was an error listing your albums: " + err.message);
          } else {
              console.log(data)
          }

    })    

}

