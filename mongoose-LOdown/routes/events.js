const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');

router.get('/pets/:id/events', eventsCtrl.new);
router.post('/pets/:id/events', eventsCtrl.create);
router.delete('/events/:id', eventsCtrl.delete);
router.get('/events/:id/edit', eventsCtrl.edit);
router.put('/events/:id', eventsCtrl.update);




module.exports = router;