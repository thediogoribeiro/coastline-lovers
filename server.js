const path = require('path');
const host = '0.0.0.0';
const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

var BD = mysql.createConnection({
	host : 'localhost',
	user : 'root',
    password : '',
    database : 'coastlinelovers'
});

BD.connect(function(err) {
    if (err) console.log(err);
    console.log('Connected to database...');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

var server = app.listen(port, host, function() {//poe o sv a correr
	console.log('Running at: ',host,port);
});

app.post('/Reservation',(req, res) => {
    var mail = req.body.mail;
    var seats = req.body.seats;
    var text = req.body.text;
    var year = req.body.y;
    var month = req.body.m;
    var day =req.body.d;
    var time = req.body.time;
    var price = req.body.price;
    var boat = req.body.boat;
    var babys = req.body.baby;
    var booking = "INSERT INTO bookings (email, barcoID, lugares, bebes, observacoes, data, hora, preco) ";
    booking +="VALUES ('"+mail+"', "+boat+","+seats+","+babys+", '"+text+"', '"+year+"-"+month+"-"+day+"','"+time+"', "+price+")";
    var query = BD.query('SELECT * FROM clientes WHERE Email = ?',[mail], function(err,res) {
		if (err) console.log(err);
		if (res.length > 0) {//user existe
            console.log('user existe');
            var query = BD.query(booking, function(err, res) {
                if (err) console.log(err);
                console.log('booking added');
            });
		}else {// user nao existe
            var sqlQuery = "INSERT INTO clientes (primeiroNome, ultimoNome, email, telefone)";
            sqlQuery += "VALUES('"+req.body.fname+"', '"+req.body.lname+"', '"+mail+"', '"+req.body.tel+"');";
            var query = BD.query(sqlQuery, function(err, res) {if (err) console.log(err);console.log('user added');});            
            var query = BD.query(booking, function(err, res) {if (err) console.log(err);console.log('booking added');});
		}
    });
	res.send({ status: "ok" });
});

app.post('/getNormalBookings',(req, res) => {// eliminei SUM(lugares), SUM(bebes),
    var query = BD.query("SELECT data, GROUP_CONCAT(hora SEPARATOR '; ') FROM bookings WHERE data>=current_date AND barcoID!=3 GROUP BY data;", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getPrivateBookings',(req, res) => {
    var query = BD.query("SELECT * FROM `bookings` WHERE data>=current_date AND barcoID=2", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getExpressBookings',(req, res) => {
    var query = BD.query("SELECT * FROM `bookings` WHERE data>=current_date AND barcoID=3", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getDateBooking',(req, res) => {
    if (req.body.type==3)  var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE barcoID=3 AND data='"+req.body.date+"' GROUP BY hora;";
    else if(req.body.type==2) var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE barcoID=2 AND data='"+req.body.date+"' GROUP BY hora;";
    else var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (barcoID=1 OR barcoID=2) AND data='"+req.body.date+"' GROUP BY hora;";
    var query = BD.query(sqlStr, function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/adminReservations',(req, res) => {
    var sqlExtra="";
    console.log(req.body.date);
    if(req.body.id!="") sqlExtra+= " AND ID="+req.body.id;
    if(req.body.boat!=0) sqlExtra+= " AND barcoID="+req.body.boat;
    if(req.body.date!="") sqlExtra+= " AND data='"+req.body.date+"'";
    if(req.body.fname!="") sqlExtra+= " AND primeiroNome='"+req.body.fname+"'";
    if(req.body.lname!="") sqlExtra+= " AND ultimoNome='"+req.body.lname+"'";
    if(req.body.email!="") sqlExtra+= " AND bookings.email='"+req.body.email+"'";
    if(req.body.telefone!="") sqlExtra+= " AND telefone='"+req.body.telefone+"'";
    var query = BD.query("SELECT * FROM bookings, clientes WHERE bookings.email=clientes.email"+sqlExtra+" ORDER BY data;", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/deleteReservation',(req, res) => {
    var query = BD.query("UPDATE bookings SET info_apagada=concat(lugares,'; ',bebes,'; ',data,'; ',hora,'; ',preco), lugares=0, bebes=0, data='1999-01-01', hora='0h', preco=999999 WHERE ID="+req.body.id+" AND email='"+req.body.email+"';", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ client: sqlRes });
    });
});

app.post('/modReservation',(req, res) => {
    var query = BD.query("UPDATE bookings SET info_apagada=concat(lugares,'; ',bebes,'; ',data,'; ',hora,'; ',preco), lugares=0, bebes=0, data='1999-01-01', hora='0h', preco=999999 WHERE ID="+req.body.id+" AND email='"+req.body.email+"';", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ client: sqlRes });
    });
});