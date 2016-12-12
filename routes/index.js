const express = require('express');
const router = express.Router();
const co = require('co');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mumshop";

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection('products');

    var mainPlates = collection.find({}).toArray().then(function(
      products) {
      console.log(products.filter(function(item) {
        return item.productType == "main"
      }));
      res.render('index', {
        title: "Mum's Shop",
        mainPlates: products.filter(function(item) {
          return item.productType == "main"
        }),
        drinks: products.filter(function(item) {
          return item.productType == "drink"
        }),
        desserts: products.filter(function(item) {
          return item.productType == "dessert"
        })
      });
      console.log("Connected successfully to server");
      db.close();
    });
  });

});

module.exports = router;
