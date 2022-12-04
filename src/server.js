const express = require('express');
const path = require('path');

const app = express();
app.use( express.static( __dirname + '/public' ));

app.get('/', function(req, res) {
    res.sendFile( path.join( __dirname, 'public', 'index.html' ));
});

app.listen(8080);
console.log('Pokedex is now Running @ http://localhost:8080/');
console.log('Press CTR + C to exit the webserver..')
