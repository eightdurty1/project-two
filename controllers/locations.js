const Location = require("../models/location");
const helper = require("../views/partials/functions");



//from exmaple
// function show(req, res, next) {
//   // Note the cool "dot" syntax to query on the property of a subdoc
//   Location.findOne({'comments._id': req.params.id}, function(err, location) {
//     // Find the comment subdoc using the id method on Mongoose arrays
//     // https://mongoosejs.com/docs/subdocs.html
//     const commentSubdoc = location.comments.id(req.params.id);
//     // Ensure that the comment was created by the logged in user
//     if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/locations/${location._id}`);
//     // Update the text of the comment
//     commentSubdoc.text = req.body.text;
//     // Save the updated book
//     location.save(function(err) {
//       // Redirect back to the book's show view
//       res.redirect(`/locations/${location._id}`);
//     });
//   });
// }

//one i made
function show(req, res) {
  console.log(req.params.id, '<--- AYO')
  Location.findById({ _id: req.params.id }).exec(function (err, location) {
    console.log(location, "<--------location");
    res.render("locations/show", { title: "Location Detail", location, editClick: 'editClick()'});
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
