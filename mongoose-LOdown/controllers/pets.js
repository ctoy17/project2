const Pet = require('../models/pet');

module.exports ={
    index,
    new: newPet,
    create,
    show,
    delete: deletePet
};



function deletePet(req, res){
    Pet.findByIdAndDelete(req.params.id, function(err, pet){
        res.redirect('/pets');
    });
}



function index(req, res) {
    Pet.find({}, function (err, pets) {
        res.render('pets/index', { title: 'All Pets', pets });
    });
}

function show(req, res) {
    Pet.findById(req.params.id, function (err, pet) {
        res.render('pets/show', { title: 'Pet Details', pet });
    });
}



function newPet(req, res){
    res.render('pets/new');
}

function create(req, res) {
    // req.body.user = req.user._id
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const pet = new Pet(req.body);
    pet.save(function (err) {
        if (err) {
            console.log(err)
            return res.redirect('/pets/new');
        }
        res.redirect(`/pets/${pet._id}`);
    });
}