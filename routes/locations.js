const express = require("express");
const router = express.Router();
const locationsCtrl = require("../controllers/locations");
const isLoggedIn = require("../config/auth");

//matches the url locations
router.get("/", locationsCtrl.index);
router.get("/new", isLoggedIn, locationsCtrl.new);
router.get("/:id", locationsCtrl.show);
router.post("/", locationsCtrl.create);

module.exports = router;
