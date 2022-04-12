const Location = require("../models/location");

module.exports = {
  create,
  delete: deleteComment,
};

function deleteComment(req, res, next) {
  Location.findOne(
    { "comments._id": req.params.id },
    function (err, locationDocument) {
      const comment = locationDocument.comments.id(req.params.id);
      if (!comment.user.equals(req.user._id))
        return res.redirect(`/locations/${locationDocument._id}`);
      comment.remove();
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
