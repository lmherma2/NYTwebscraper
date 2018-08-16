const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Articles collection and inserts the Articles below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact"
);

constArticleSeed = [ {title : "Hello World"}
];

db.Article
  .then(() => db.Article.collection.insertMany(ArticleSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
