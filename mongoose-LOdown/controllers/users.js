var User = require('../models/user');
var Pet = require('../models/pet');

modules.exports = {
    new: newUser,
    create,
    addToPet
};
function addToPet(req, res) {
    Pet.findById(req.params.id, function(err, pet) {
      pet.user.push(req.body.userName);
      pet.save(function(err) {
        res.redirect(`/pets/${pet._id}`);
      });
    });
  }
  
  function create(req, res) {
    User.create(req.body, function(err, user) {
      res.redirect('/users/new');
    });
  }
  
  function newUser(req, res) {
    user.find({}, function(err, users) {
      res.render('users/new', {
        title: 'Add Owner',
        users
      });
    })
  }