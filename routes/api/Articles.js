const router = require("express").Router();
const ArticlesController = require("../../controllers/ArticlesController");
const db = require("../../models");

// Matches with "/api/Articles"
router.route("/")
  .get(ArticlesController.findAll)
  // .then(result => res.send("from db!!!"))
  
  
// Matches with "/api/Articles/post"
router.route("/post")
  .then(console.log("post"))
  .post(ArticlesController.create);

// Matches with "/api/Articles/:id"
router
  .route("/:id")
  .get(ArticlesController.findById)
  .put(ArticlesController.update)
  .delete(ArticlesController.remove);

module.exports = router;
