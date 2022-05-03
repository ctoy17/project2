const Pet = require('../models/pet');
const Entry = require('../models/entry');

module.exports = {
    new: newEntry,
    create,
    delete: deleteEntry,
};

function newEntry(req, res) {
  res.render('entries/new', { petId: req.params.id });
}


function create(req, res) {
  let petEntry = { pet: req.params.id,
    entries: req.body.entry,
    user: req.body.user
  }
  const newPetEntry = new Entry (petEntry);
  newPetEntry.save(function(err){
    if (err){
      res.render('pets/new', {
        petId: req.params.id,
      })
    }else{
      res.redirect('/pets');
    };
  });
}

function deleteEntry(req, res) {
  Event.findByIdAndDelete(req.params.id, function(err){
    res.redirect(`/pets/${pet._id}`);
  });
}