var express = require('express')
var app = express();
app.use( express.static(__dirname +"/views"));
app.set("view engine", "ejs")


// Custom middleware to verify the time of the request
var verifyTimeRequest = (req, res, next) => {
    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    var currentHour = currentDate.getHours();
  
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 21) {
      next();
    } else {
      res.status(503).send("L’application web n’est disponible que pendant les heures de travail (du lundi au vendredi, de 9h à 17h .)");
    }
  };

  
// Use the custom middleware for all routes
  app.use(verifyTimeRequest);


// Home page route
app.get('/', function(req, res){
     res.render("accueil")
  });



app.get('/service', function(req, res){
       res.render("service")
    });


app.get('/contact', function(req, res){
    res.render("contact")
  });

  

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });

