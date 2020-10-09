var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');
var bcrypt = require('bcrypt-nodejs');
var AWS = require('aws-sdk');
var multer = require('multer')


var albumBucketName = "youtube-project-2";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:3dd5b3b8-326c-4be6-9f32-67943932637a";//old
// var IdentityPoolId = "us-east-1:f794d7bd-1053-440c-8673-8f7e22c6ad4c";//new

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

// const upload = multer({storage}).single('image')
const upload = multer({storage}).single('file')


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



exports.updateBucket = async(req,res)=>{

    // var files = req.body.files;

    console.log(req.file)

    // var file = files[0];
    // var fileName = file.name;

    // var photoKey = ""+fileName

    // var upload = new AWS.S3.ManagedUpload({
    //     params: {
    //     Bucket: albumBucketName,
    //     Key: photoKey,
    //     Body: file,
    //     ACL: "public-read"
    //     }
    // });

    // var promise = upload.promise();

    // promise.then(
    //     function(data) {
    //     console.log("Successfully uploaded photo.");
    //     // viewAlbum(albumName);
    //     },
    //     function(err) {
    //     // return alert("There was an error uploading your photo: ", err.message);
    //     console.log("There was an error uploading your photo: ", err.message);
    //     }
    // );



}