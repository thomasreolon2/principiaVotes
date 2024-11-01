const express = require('express');
const { calculateVotes } = require('../controllers/voteCalcController');

const router = express.Router();

router.get('/calculate', calculateVotes);

module.exports = router;
