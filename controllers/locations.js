const Location = require("../models/location");

function show(req, res) {
  Location.findById({ _id: req.params.id }, function (err, location) {
    console.log(location, "<--------location");
    res.render("locations/show", { title: "Location Detail", location });
  });
}

function newLocation(req, res) {
  res.render("locations/new", { title: "Add Location" });
}

function index(req, res) {
  console.log(req.user, "< - req.user");
  Location.find({}, function (err, locations) {
    res.render("locations/index", { locations, title: "All Locations" });
  });
}

function create(req, res) {
  const location = new Location(req.body);
  location.save(function (err) {
    console.log(err, "this err");
    if (err) return res.redirect("/locations/new");
    console.log(location);
    res.redirect("/locations");
  });
}

module.exports = {
  create,
  index,
  new: newLocation,
  show,
};
