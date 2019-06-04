const express = require('express');
const router =express.Router();
const Offer = require('../models/offers');

//get a list of offers from the db
router.get('/offers',function(req,res){
    const r1 = new RegExp(req.query.txt);
    //check for nosql injection in r1;
    Offer.aggregate().near(
        {
            geoNear: "Store",
            near:{type: "Point", coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
            spherical: true,
            maxDistance: 5*1609.344,
            distanceField: "distance",
            "query": {
                "available": true,
                $or: [{"desc": r1} , {"name": r1 }]
            }
        }
    ).then(function(offers){
        console.log(offers);
        res.send(offers);
    })
});

//add a new offer to the db
router.post('/offers',function(req,res){
    Offer.create(req.body).then(function(offer){
       res.send(offer);
    });   
});

//update an offer
router.put('/offers/:id',function(req,res){
    Offer.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
       Offer.findOne({_id:req.params.id}).then(function(offer){
        res.send(offer);
       })
    });
});

//delete an offer
router.delete('/offers/:id',function(req,res){
    Offer.findByIdAndRemove({_id:req.params.id}).then(function(offer){
        res.send(offer);
    });
});

module.exports = router;