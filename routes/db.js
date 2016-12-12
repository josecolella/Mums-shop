'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mumshop"

class DB {
  constructor() {
    MongoClient.connect(url, function(err, db) {
      console.log("Connected successfully to server");
    });
  }

  getProducts() {
    
  }
}
