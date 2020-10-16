var Column = require('../models/column.js');
var Counter = require('../models/counter.js');
var jwt = require('jwt-simple');

exports.getColumn = async(req,res)=>{

    var column = await Column.find({})

    // var userObj = req.body    
    // var decode = jwt.decode(req.body.token,'123')
    
    // var column = await Column.find({"creator":decode.sub})
    
    res.send(column);
}

exports.getColumnToken = async(req,res)=>{

    var userObj = req.body    
    var decode = jwt.decode(req.body.token,'123')
    
    var column = await Column.find({"creator":decode.sub})
    
    res.send(column);
}

exports.getColumnCustom = async(req,res)=>{

    var data = req.body;

    var column = await Column.find({"id":data.id})
    
    res.send(column);
}
  

exports.setColumn = async(req,res)=>{
    
    var decode = jwt.decode(req.body.creator,'123');

    var data = req.body;

    data['creator'] = decode.sub;
    
    var newColumn = data;
    
    var column = new Column(newColumn);
    
    column.save(function(err){
        if(!err){
            console.log('Column Save');
        }
    })
    
    res.send(newColumn);
    
}


exports.getGameRecap = async(req,res)=>{

    var userObj = req.body    
    var decode = jwt.decode(req.body.token,'123')

    // > db.columns.aggregate([{"$group":{"_id":"$status","total":{"$sum":1}}}])
    var master = await Column.aggregate([{"$match":{"creator":decode.sub}},{"$group":{"_id":"$status","total":{"$sum":1}}},{"$sort":{"_id":-1}}])
    
    res.send(master);

}

exports.getHistorial = async(req,res)=>{
    
    var userObj = req.body    
    var decode = jwt.decode(req.body.token,'123')
    
    var column = await Column.find({"creator":decode.sub})
    
    res.send(column);
    
}
        
exports.getCounter = async(req,res)=>{

    var counter = await Counter.find({"id":"1"})

    res.send(counter)
}

exports.setCounter = async(req,res)=>{

    var counter = await Counter.findOne({"id":"1"},function(err,c){
        c.quantity += 1 
        c.save(function(err,c){
            console.log("Counter updated");
        })        
    });

    res.send([{'message':'end'}]);

}

exports.updateColumns = async(req,res)=>{

    var column = await Column.findOne({"id":req.body.id}, function(err,c){
        c.columns = req.body.columns
        c.save(function(err,c){
            console.log("Column updated");
        })        

    })

    res.send([{'message':'end update'}]);

}

exports.getColumnSortedAsc = async(req,res)=>{

    var column = await Column.find({}).sort({"date":1})
    
    res.send(column);
}

exports.getColumnSortedDes = async(req,res)=>{

    var column = await Column.find({}).sort({"date":-1})
    
    res.send(column);
}

exports.getColumnSortedTop = async(req,res)=>{

    var column = await Column.find({}).sort({"date":-1}).limit(req.body.top)
    
    res.send(column);
}

exports.getEditVideo = async(req,res)=>{

    var column = await Column.find({"_id":req.body.id}).sort({"date":-1})
    
    res.send(column);
}

exports.setEditVideo = async(req,res)=>{

    var column = await Column.findOne({"_id":req.body.id}, function(err,c){
        c.title = req.body.title
        c.description = req.body.description
        c.save(function(err,c){
            console.log("Column updated");
        })        

    })

    res.send(column);
}

exports.deleteVideo = async(req,res)=>{
    
    var obj = req.body    
    
    var column = await Column.remove({"_id":obj.id})
    
    res.send(column);
    
}