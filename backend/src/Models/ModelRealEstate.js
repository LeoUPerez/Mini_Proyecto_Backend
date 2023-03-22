const {Schema, model} = require('mongoose');

const SchemaRealEstate = new Schema({
    _id: String,
    Property_type: String,
    City: String,
    Sector: String,
    Bedrooms: Number,
    Bathrooms: Number,
    Parking: Number,
    Construction: String,
    Description: String,
    ImageURL: String,
    Status: String,
    Price: String

})

module.exports = model('Real Estate', SchemaRealEstate);