const Pet = require('../models/pet');

module.exports = {
  index,
  new: newPet,
  create
};

function index(req, res) {
  Pet.find({}, function(err, pets) {
    res.render('pet/index', { title: 'All Pets', pets });
  });
}


function newPet(req, res) {
  res.render('pets/new', { title: 'Add Pet' });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var pet = new Pet(req.body);
  pet.save(function(err) {
    if (err) return res.redirect('/pets/new');
    res.redirect(`/pets/${pet._id}`);
  });
}
