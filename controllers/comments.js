const Location = require("../models/location");

module.exports = {
  create,
  delete: deleteComment,
  edit: editComment,
  // update: updateFunction
};
//from example
// function update(req, res, next) {
//   // Note the cool "dot" syntax to query on the property of a subdoc
//   Location.findOne({'comments._id': req.params.id}, function(err, location) {
//     // Find the comment subdoc using the id method on Mongoose arrays
//     // https://mongoosejs.com/docs/subdocs.html
//     const commentSubdoc = book.comments.id(req.params.id);
//     // Ensure that the comment was created by the logged in user
//     if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
//     // Update the text of the comment
//     commentSubdoc.text = req.body.text;
//     // Save the updated book
//     book.save(function(err) {
//       // Redirect back to the book's show view
//       res.redirect(`/books/${book._id}`);
//     });
//   });
// }

//from example
// function editComment(req, res, next) {
//   Location.findOne({'c._id' : req.params.id}, function (err, location) {
//     const c = location.comments.id(req.params.id);
//     res.render('/comments/', {c});
//   })
// }

//one i made



function editComment(req, res, next) {
  Location.findOne(
    { "comments._id": req.params.id },
    function (err, locationDocument) {
      const comment = locationDocument.comments.id(req.params.id);
      // console.log(req, "<-- req user");
      console.log(req.body, "<-- req body");
      comment.comments = req.body.text;
      // console.log(comment, "<---");
      //No error
      locationDocument.save(function (err) {
        if (err) next(err);
        res.redirect(`/locations/${locationDocument._id}`);
      });
    }
  );
}








function deleteComment(req, res, next) {
  Location.findOne(
    { "comments._id": req.params.id },
    function (err, locationDocument) {
      const comment = locationDocument.comments.id(req.params.id);
      console.log(req, "<-- req user");

      comment.remove();
      console.log(comment, "<---");
      //No error
      locationDocument.save(function (err) {
        if (err) next(err);
        res.redirect(`/locations/${locationDocument._id}`);
      });
    }
  );
}

function create(req, res) {
  Location.findById(req.params.id, function (err, locationFromTheDatabase) {
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    console.log(req.user, "<----- User");

    locationFromTheDatabase.comments.push(req.body);

    locationFromTheDatabase.save(function (err) {
      console.log(locationFromTheDatabase, "<---Adding comment");
      res.redirect(`/locations/${locationFromTheDatabase._id}`);
    });
  });
}
