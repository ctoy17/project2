const Pet = require('../models/pet');

module.exports = {
    create,
    delete: deleteEvent
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




function create(req, res) {
    // Find the movie to embed the review within
    Pet.findById(req.params.id, function(err, pet) {
  
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
  
      // Push the subdoc for the review
      pet.events.push(req.body);
      // Always save the top-level document (not subdocs)
      pet.save(function(err) {
        res.redirect(`/pets/${pet._id}`);
      });
    });
  }
  
  function deleteEvent(req, res, next) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Pet.findOne({'events._id': req.params.id}).then(function(pet) {
      // Find the review subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const event = pet.events.id(req.params.id);
      // Ensure that the review was created by the logged in user
      if (!event.user.equals(req.user._id)) return res.redirect(`/pets/${pet._id}`);
      // Remove the review using the remove method of the subdoc
      event.remove();
      // Save the updated movie
      pet.save().then(function() {
        // Redirect back to the movie's show view
        res.redirect(`/pets/${pet._id}`);
      }).catch(function(err) {
        // Let Express display an error
        return next(err);
        // res.redirect(`/movies/${movie._id}`);
      });
    });
  }
  