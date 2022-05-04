const Pet = require('../models/pet');

module.exports = {
    new: newEntry,
    create
};

function newEntry(req, res) {
  res.render('events/new', { petId: req.params.id });
}


function create(req, res) {
  Pet.findById(req.params.id, function(err, pet){
    pet.entries.push(req.body);
    pet.save(function(err){
      res.redirect(`/pets/${pet._id}`);
    });
  })
}

