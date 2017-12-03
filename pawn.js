// OGC Pawn
'use strict'; 
//Load what we will need 
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var moment = require('moment');
// Route files
var index = require('./routes/index.js');

// Set the view engine to the amazing ejs!
app.set('view engine', 'ejs');

// Make Public folder Public
app.use('/public', express.static(process.cwd() + '/public'));


// Routes
app.get('/', index.homepage);

// Start Server
app.listen(port, function(){
	console.log('Server listening on port ' + port + '.....');
});
