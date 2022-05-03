const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventsSchema = new Schema ({
    entryEvent: {type: String},
    eventTime: {type: Date},
    duration: {type: String},
    details: {type: String},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{ timestamps:true
});

const petSchema = new Schema ({
    petName: {type: String},
    petPhoto: {data: Buffer, contentType: String},
    petAge: {type: Number},
    animalType: {type: String},
    petBreed: {type: String},
    events: [eventsSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{ timestamps:true
});
module.exports = mongoose.model("Pet", petSchema);