const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/save', cartController.saveCart);
router.get('/:userId', cartController.getCart);

module.exports = router;
