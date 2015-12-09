var assert = require('assert')
var db = require('../db')

exports.insert = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Insert a user
  collection.insert(user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log('Inserted 1 document into the users collection')
    callback(result)
  })
}

exports.find = function(id, callback){
  // Get users collection
  var collection = db.get().collection('users')

  collection.findOne({'id': id},function(err,document){
    assert.equal(err, null)
    console.log('Found 1 user document')
    callback(document)
  })
}

exports.update = function(user, callback){
  var collection = db.get().collection('users')
  user.id = user.id
  //Update the user
  collection.update({'id': user.id}, user, function(err, result){
    assert.equal(err,null)
    assert.equal(1, result.result.n)
    console.log('Updated 1 user document')
    callback()
  })
}
