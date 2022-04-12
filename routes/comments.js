const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/locations/:id/comments', commentsCtrl.create);
router.delete('/reviews/:id', commentsCtrl.delete);


module.exports = router;