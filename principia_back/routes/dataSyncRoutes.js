const express = require('express');
const { syncData } = require('../controllers/dataSyncController');

const router = express.Router();

router.get('/', syncData);

module.exports = router;
