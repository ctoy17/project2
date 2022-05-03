const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema ({
    entryEvent: {type: String},
    entryTime: {type: Date},
    duration: {type: String},
    details: {type: String},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{ timestamps:true
});
module.exports = mongoose.model('Entry', entrySchema);