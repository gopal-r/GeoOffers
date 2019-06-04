const mongoose =require("mongoose");
const Schema = mongoose.Schema;


//create geolocation schema
const GeoSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates:{
        type:[Number],
        index: "2dsphere"
    }
});

// create offers schema & model
const OfferSchema = new Schema({
    id: {
        type: String,
        required: [true, 'ID field is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    desc: {
        type: String,
        required: [true, 'Desc is required']
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});
 const Offer = mongoose.model('offer',OfferSchema);
 module.exports = Offer;