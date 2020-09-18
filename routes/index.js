const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

// setup requested routes

router.get('/', homeController.home);
router.use('/users', require('./users'));

// exports this file
module.exports = router;