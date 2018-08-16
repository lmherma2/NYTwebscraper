const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
try {
  app.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(__dirname + '/client/build/index.html');
    } else {
      res.sendFile(__dirname + '/../client/public/index.html');
    }
  });
  
} catch (err) {
  console.log(`Error: ${err.message}`);
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
