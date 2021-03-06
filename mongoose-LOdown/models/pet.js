const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
        entryEvent: {type: String, enum: ['Seizure', 'Other']},
        entryDate: {type: Date},
        duration: {type: String},
        details: {type: String},
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: String,
        userAvatar: String
    },{ timestamps:true
});


const petSchema = new Schema ({
    petName: {type: String},
    data: Buffer,
    contentType: String,
    petAge: {type: Number},
    animalType: {type: String},
    petBreed: {type: String},
    events: [eventSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{ timestamps:true
});

module.exports = mongoose.model('Pet', petSchema);