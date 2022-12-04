//import statements
const express = require('express');
const path = require('path');

//Setup express as app
const app = express();
//Tells the app to use the /public directory
app.use( express.static( __dirname + '/public' ));

//create the route for the "/" url location
app.get('/', function(req, res) {
    res.sendFile( path.join( __dirname, 'public', 'index.html' ));
});

//start the app on port 8080 and log the data
app.listen(8080);
console.log('Pokedex is now Running @ http://localhost:8080/');
console.log('Press CTR + C to exit the webserver..')
