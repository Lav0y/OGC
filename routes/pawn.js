"use strict";

var mysql = require("mysql");
var request = require("request");

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
	var uuid = req.body.uuid;
	var exec = require("child_process").exec;
	exec("gpio -g mode 18 out" , function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
	res.status(200).send("GPIO 18 on ")
};

exports.gpiooff = function(req, res) {
	var uuid = req.body.uuid;
	var exec = require("child_process").exec;
	exec("gpio -g mode 18 in", function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
	res.status(200).send("GPIO 18 off")
};

exports.gpiotoggle = function(req, res) {
	var uuid = req.body.uuid;
	var exec = require("child_process").exec;
	exec("gpio -g mode 18 out", function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
	var exec = require("child_process").exec;
	exec("gpio -g mode 18 in", function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
	res.status(200).send("GPIO 18 Toggled)
};

 