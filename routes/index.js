const express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    objhash = require('object-hash'),
    strhash = require('string-hash'),
    url = "mongodb://localhost:27017/mumshop";

/* GET home page. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        let collection = db.collection('products');

        var mainPlates = collection.find({}).toArray().then(function(
            products) {
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

//Used to process the adding of products
router.post('/add', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        let collection = db.collection('products');
        collection.findOne({
            'name': req.body.productName
        }).then(function(product) {
            res.json(product);
        }, function(err) {
            throw err;
        });
    });
});

//Used to process the order
router.post('/processOrder', function(req, res) {
    let success = 0;
    let clientToken = -1;
    if (req.body.order.length > 0) {
        let currentDate = new Date();
        let salt = currentDate.getDate().toString() + currentDate.getMonth().toString() + currentDate.getFullYear().toString() + currentDate.getTime().toString();
        //Generate client token for order
        clientToken = strhash(objhash(req.body.order) + salt);


        MongoClient.connect(url, function(err, db) {
            let collection = db.collection('orders');
            collection.insertOne({
                'clientToken': clientToken,
                'order': req.body.order,
                'total': req.body.total
            }, function(err, result) {
                if (err) throw err;
                console.log("Inserted Correctly");
            })
        });
        success = 1;
    }

    res.json({
        "success": success,
        "token": clientToken
    });
})

module.exports = router;
