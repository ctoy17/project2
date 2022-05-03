const Pet = require('../models/pet');

module.exports = {
    create,
    delete: deleteEntry,
    edit,
    update
};

function update(req, res) {
    console.log("hello")
    Pet.findOne({ 'events._id': req.params.id }, function (err, pet) {
        const eventsSubdoc = pet.events.id(req.params.id);
        if (!eventsSubdoc.user.equals(req.user._id)) return res.redirect(`/pets`);
        eventsSubdoc.details = req.body.details;
        pet.save(function (err) {
            res.redirect(`/pets/${pet._id}`);
        });
    });
}

function edit(req, res) {
    Pet.findOne({ _id: req.params.id, user: req.user._id }, function (err, pet) {
        if (err || !pet) return res.redirect('/pets');
        res.render('/pets', { pet });
    });
}

async function deleteEntry(req, res) {
    const pet = await Pet.findOne({ 'events._id': req.params.id });
    const event = pet.events.id(req.params.id);
    if (!event.user.equals(req.user._id)) return res.redirect(`/pets/${pet._id}`);
    event.remove();
    await pet.save();
    res.redirect(`/pets/${pet._id}`);
}

function create(req, res) {
    Pet.findById(req.params.id, function (err, pet) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        // Push the subdoc for the review
        pet.events.push(req.body);
        // Always save the top-level document (not subdocs)
        pet.save(function (err) {
            res.redirect(`/pets/${pet._id}`);
        });
    });
}