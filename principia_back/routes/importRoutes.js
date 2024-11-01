const express = require('express');
const { importSurvey, getUniqueSurveyIds } = require('../controllers/importController');

const router = express.Router();

router.post('/', importSurvey);
router.get('/unique-ids', getUniqueSurveyIds);  

module.exports = router;
