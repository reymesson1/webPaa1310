var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('static'))
var moment = require('moment');
app.use(bodyParser.json());
var today = moment(new Date()).format('YYYY-MM-DD');
var User = require('./models/user.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var AWS = require('aws-sdk');
var userController = require('./controller/userController');
var columnController = require('./controller/columnController');
var awsController = require('./controller/awsController');
var cors = require('cors');
app.use(cors())

var AWS = require('aws-sdk');
var multer = require('multer')


var albumBucketName = "youtube-project-2";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:3dd5b3b8-326c-4be6-9f32-67943932637a";//old


app.get('/logout', userController.getLogout);

app.get('/columns', columnController.getColumn);

app.post('/columnstoken', columnController.getColumnToken);

app.get('/columnsortasc', columnController.getColumnSortedAsc);

app.get('/columnsortdes', columnController.getColumnSortedDes);

app.post('/columnsorttop', columnController.getColumnSortedTop);

app.post('/updatecolumns', columnController.updateColumns);

app.post('/customcolumns', columnController.getColumnCustom);

app.post('/gamerecap', columnController.getGameRecap);

app.get('/getcounter', columnController.getCounter);

app.get('/setcounter', columnController.setCounter);

app.post('/historial', columnController.getHistorial);

app.post('/column', columnController.setColumn);

app.post('/register', userController.setRegister);

app.post('/updateregister', userController.updateRegister);
  
app.post('/login', userController.setLogin);

app.post('/resetpassword', userController.setResetPassword);

app.get('/user', userController.getUser);

app.get('/bucket', awsController.getBucket);

app.post('/creatingjobbucket', awsController.creatingJobBucket);

app.post('/deletevideo', columnController.deleteVideo);

// app.post('/updatebucket', awsController.updateBucket);

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

// const upload = multer({storage}).single('image')
const upload = multer({storage}).single('file')

app.post('/updatebucket',upload,(req, res) => {


    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    // var photoKey = ""+fileName

    var upload = new AWS.S3.ManagedUpload({
        params: {
        Bucket: albumBucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: "public-read"
        }
    });

    var promise = upload.promise();

    promise.then(
        function(data) {
        console.log("Successfully uploaded photo.");
        res.send({"token":"end"})
        // viewAlbum(albumName);
        },
        function(err) {
        // return alert("There was an error uploading your photo: ", err.message);
        console.log("There was an error uploading your photo: ", err.message);
        res.send({"error":"end"})
        }
    );


});
mongoose.connect('mongodb://localhost:27017/youtube',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(8083);