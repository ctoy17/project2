const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');


router.post('/pets/:id/events', eventsCtrl.create);



module.exports = router;