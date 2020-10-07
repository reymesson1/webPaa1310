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
var userController = require('./controller/userController');
var columnController = require('./controller/columnController');
var cors = require('cors');
app.use(cors())

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

mongoose.connect('mongodb://localhost:27017/youtube',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(8083);