const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');

router.post('/pets/:id/events', eventsCtrl.create);
router.delete('/pets/:id', eventsCtrl.delete);


module.exports = router;