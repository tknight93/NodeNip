var express = require('express');
var mongoUtil = require('./mongoUtil');
var compression = require("compression");


var app = express();
app.use(compression());
app.use(express.static('public'));
app.listen(11111);


mongoUtil.connectToServer( function( err ) {
    if(err) throw err;
    console.log('connected to server');
});

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + "/public" } );
});

app.get('/getLengthData', function(req,res){
    // Use connect method to connect to the server
    mongoUtil.getDb().collection("Length").find({}).toArray(function(err, result) {
        if (err){
            res.status(500).send({error: 'Database Data Issue', message: err.message});
            return;
        }
        res.send(result);
    });
});