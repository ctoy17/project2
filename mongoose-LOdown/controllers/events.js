const res = require('express/lib/response');
const Pet = require ('../models/pet');

module.exports = {
    create
}
function create(req, res){
    console.log(req.params.id);
    Pet.findById(req.params.id, function(err, pet){
        pet.events.push(req.body);
        flight.save(function(err){
            res.redirect(`/pets/${pet._id}`);
        });
    });
}
