const { SchemaType } = require("mongoose");

const mongoose require('mongoose');
const Schema = mongoose.Schema;

const favoriteScheme = new Schema ({
    user:{
        type: Schema.Type.ObjectId,
        ref: 'Users'
    }

    campsites: [{
        type: Schema.Type.ObjectId,
        ref: 'Campsites'
    }]

    module.exports(Favorites, favoriteSchema)