// OGC Pawn
'use strict'; 
//Load what we will need 
var express = require('express');
var app = express();
var port = process.env.PORT || 8081;
var moment = require('moment');
// Route files
var pawn = require('./routes/pawn.js');

// Set the view engine to the amazing ejs!
app.set('view engine', 'ejs');

// Make Public folder Public
app.use('/public', express.static(process.cwd() + '/public'));


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Routes
app.get('/', pawn.homepage);
app.post('/gpio/on', pawn.gpioon);
app.post('/gpio/off', pawn.gpiooff);
app.post('/gpio/toggle', pawn.gpiotoggle);

// Start Server
app.listen(port, function(){
	console.log('Server listening on port ' + port + '.....');
});
