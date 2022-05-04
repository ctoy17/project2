const Pet = require('../models/pet');
var fs = require('fs');
var path = require('path');


module.exports ={
    index,
    new: newPet,
    create,
    show,
    delete: deletePet
};

function index(req, res) {
    Pet.find({}, function (err, pets) {
        res.render('pets/index', {title: 'All Pets', pets });
    });
}

function newPet(req, res){
    res.render('pets/new');
}

function create (req, res) {
	let petCreate = {
        petName: req.body.petName,
        petAge: req.body.petAge,
        animalType: req.body.animalType,
        petBreed: req.body.petBreed,
        user: req.user._id,
		    data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
        contentType: 'image/*'
  };
	Pet.create(petCreate, (err, pets) => {
		req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.userAvatar = req.user.avatar
		if (err) {
			return res.render('pets/new');
		} else {
			pets.save();
			res.redirect('pets/index');
		};
	});
};

function show(req, res) {
    Pet.findById(req.params.id, function (err, pet) {
        res.render('pets/show', {pet});
    });
}


function deletePet(req, res){
    Pet.findOneAndRemove({_id: req.params.id}, (err, pet)=>{
      if (err){
        res.redirect(`/pets/${pet._id}`)
      }
        res.redirect('/pets/index');
    });
}
