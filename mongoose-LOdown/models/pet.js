const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
        entryEvent: {type: String},
        entryTime: {type: Date},
        duration: {type: String},
        details: {type: String},
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    },{ timestamps:true
});


const petSchema = new Schema ({
    petName: {type: String},
    data: Buffer,
    contentType: String,
    petAge: {type: Number},
    animalType: {type: String},
    petBreed: {type: String},
    entries: [entrySchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{ timestamps:true
});

module.exports = mongoose.model('Pet', petSchema);