const express = require('express');
const router = express.Router();
const petsCtrl = require('../controllers/pets');
const path = require('path');

const isLoggedIn = require('../config/auth');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+file.fieldname)
    },
});

const upload = multer({ storage: storage });




router.get('/', petsCtrl.index);
router.get('/new', isLoggedIn, petsCtrl.new);
router.get('/:id', petsCtrl.show);
router.post('/', upload.single('img'), isLoggedIn, petsCtrl.create);
router.delete('/:id', petsCtrl.delete);

module.exports = router;