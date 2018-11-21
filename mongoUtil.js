var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

const url = 'mongodb://prod-nip-r:prod-nip-r@127.0.0.1:27017?authMechanism=DEFAULT&authSource=admin';

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url, { useNewUrlParser: true }, function( err, client ) {
        _db = client.db('nip');
        return callback( err );
    });
  },

  getDb: function() {
    return _db;
  }
};