var express = require('express');
var app = express();
const port = 11111;

// Retrieve
var MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'nip';

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + "/public" } );
})

app.get('/getLengthData', function(req,res){
    // Use connect method to connect to the server
    MongoClient.connect(url,  function(err, client) {
        if (err){ 
            res.status(500).send({error: 'Database Connect Issue', message: err.message}); 
            return; 
        }
        const db = client.db(dbName);
        db.collection("Length").find({}).toArray(function(err, result) {
            if (err){
                res.status(500).send({error: 'Database Data Issue', message: err.message})
                return 
            }
            res.send(result);
        });
        client.close();
    });
});

app.use(express.static('public'))
app.listen(port);