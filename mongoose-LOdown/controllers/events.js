const Pet = require('../models/pet');
const User = require('../models/user');

module.exports = {
    new: newEntry,
    create,
    delete: deleteEntry,
    edit,
    update
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

function edit(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Pet.findOne({'events._id': req.params.id}, function(err, pet) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const event = pet.events.id(req.params.id);
    // Render the comments/edit.ejs template, passing to it the comment
    res.render('events/edit', {event});
  });
}

function update(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Pet.findOne({'events._id': req.params.id}, function(err, pet) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const eventSubdoc = pet.events.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    // Update the text of the comment
    eventSubdoc.details = req.body.details;
    // Save the updated book
    pet.save(function(err) {
      // Redirect back to the book's show view
      res.redirect(`/pets/${pet._id}`);
    });
  });
}