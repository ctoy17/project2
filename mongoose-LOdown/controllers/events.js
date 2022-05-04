const Pet = require('../models/pet');

module.exports = {
    new: newEntry,
    create
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

