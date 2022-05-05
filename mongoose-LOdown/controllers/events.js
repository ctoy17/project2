const Pet = require('../models/pet');
const User = require('../models/user');

module.exports = {
    new: newEntry,
    create,
    delete: deleteEntry
};

function newEntry(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  res.render('events/new', { petId: req.params.id });
}


function create(req, res) {
  Pet.findById(req.params.id, function(err, pet){
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    pet.events.push(req.body);
    pet.save(function(err){
      res.redirect(`/pets/${pet._id}`);
    });
  })
}

function deleteEntry(req, res, next) {
  Pet.findOne({'events._id': req.params.id}).then(function(pet) {
    const entry = pet.events.id(req.params.id);
    if (!entry.user.equals(req.user._id)) return res.redirect(`/pets/${pet._id}`);
    entry.remove();
    pet.save().then(function() {
      res.redirect(`/pets/${pet._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}