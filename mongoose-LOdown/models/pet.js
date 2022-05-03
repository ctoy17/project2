const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema ({
    petName: {type: String},
    petPhoto: {data: Buffer, contentType: String},
    petAge: {type: Number},
    animalType: {type: String},
    petBreed: {type: String},
    entries: { type: Schema.Types.ObjectId, ref: 'Entry' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{ timestamps:true
});
module.exports = mongoose.model("Pet", petSchema);