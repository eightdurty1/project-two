const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.post("/locations/:id/comments", commentsCtrl.create);
router.delete("/comments/:id", commentsCtrl.delete);
router.put("/comments/:id", commentsCtrl.edit);
module.exports = router;
