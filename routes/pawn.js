"use strict";

var mysql = require("mysql");
var request = require("request");
var sleep = require("sleep");

var connection = mysql.createPool({
	multipleStatements: true,
	host: "192.168.202.159",
	user: "admin",
	password: "admin",
	database: "ogc"
});
const uuidV4 = require("uuid/v4");

exports.homepage = function(req, res) {
	connection.getConnection(function(err, connection) {
		if (err) throw err;
		var query = connection.query("SELECT * FROM pawn", function(err, rows) {
			if (err) console.log("Error Selecting : %s", err);
			res.render("pages/pawn", { title: "All Parts", rows: rows });
		});
		connection.release();
	});
};

exports.gpioon = function(req, res) {
	var bcm = req.body.bcm;
	var exec = require("child_process").exec;
	exec("gpio -g write " + bcm +" 1" , function(error, stdout, stderr) {
		console.log("GPIO: " + bcm + " on")
		if (error !== null) {
			console.log("exec error: " + error);
		}
		res.status(200).send("GPIO: " + bcm + " on ")
	});
};

exports.gpiooff = function(req, res) {
	var bcm = req.body.bcm;
	var exec = require("child_process").exec;
	exec("gpio -g write " + bcm +" 0", function(error, stdout, stderr) {
		console.log("GPIO: " + bcm + " off")
		if (error !== null) {
			console.log("exec error: " + error);
		}
		res.status(200).send("GPIO: " + bcm + " off")
	});
	
};

exports.gpiotoggle = function(req, res) {
	var bcm = req.body.bcm;
	var exec = require("child_process").exec;
	exec("gpio -g write " + bcm +" 1", function(error, stdout, stderr) {
		console.log("GPIO: " + bcm + " Toggled")
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
	sleep.sleep(1)
	var exec = require("child_process").exec;
	exec("gpio -g write " + bcm +" 0", function(error, stdout, stderr) {
		if (error !== null) {
			console.log("exec error: " + error);
		}
		res.status(200).send("GPIO: " + bcm + " Toggled")
	});
	
};

 