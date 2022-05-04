const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');

router.get('/pets/:id/events', eventsCtrl.new);
router.post('/pets/:id/events', eventsCtrl.create);




module.exports = router;