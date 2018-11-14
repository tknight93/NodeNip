var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

const url = 'mongodb://localhost:27017';

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url, { useNewUrlParser: true }, function( err, db ) {
        _db = db.db('nip');
        return callback( err );
    });
  },

  getDb: function() {
    return _db;
  }
};