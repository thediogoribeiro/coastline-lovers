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
    var mail = req.body.email;
    var seats = req.body.seats;
    var text = req.body.obs;
    var time = req.body.time;
    var price = req.body.preco;
    var tour = req.body.tour;
    var babys = req.body.baby;
    var pNome = req.body.fName;
    var uNome = req.body.lName;
    var tel = req.body.tel;
    var date = "'"+req.body.date+"'";
    var receber = req.body.receber;
    var pagar = req.body.pagar;
    var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='"+tour+"' AND hora='"+time+"' AND data="+date+" GROUP BY hora;";
    if(tour=='normal') var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND hora='"+time+"' AND data="+date+" GROUP BY hora;";
    BD.query(sqlStr, function(err,sqlRes) {
        if (err) console.log(err);
        if (sqlRes[0]==null || (sqlRes[0]['SUM(lugares)']+parseInt(seats, 10)<=10 && sqlRes[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){
            var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `aReceber`, `aPagar` ) ";
            booking += "VALUES ('"+pNome+"','"+uNome+"','"+mail+"','"+tel+"','"+tour+"',"+seats+","+babys+", '"+text+"', "+date+",'"+time+"', "+price+",'"+receber+"', '"+pagar+"')";        
            BD.query(booking, function(err,sqlRes) {if (err) console.log(err);});
            res.send({ insert: "OK" });
        }else{
            res.send({ insert: "ERROR" });
        }
    });
});

app.post('/getNormalBookings',(req, res) => {
    var query = BD.query("SELECT data, GROUP_CONCAT(hora SEPARATOR '; ') FROM bookings WHERE data>=current_date AND tour!='express' GROUP BY data;", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getPrivateBookings',(req, res) => {
    var query = BD.query("SELECT * FROM `bookings` WHERE data>=current_date AND tour='private'", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getExpressBookings',(req, res) => {
    var query = BD.query("SELECT * FROM `bookings` WHERE data>=current_date AND tour='express'", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getDateBooking',(req, res) => {
    if (req.body.type=='express')  var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND data='"+req.body.date+"' GROUP BY hora;";
    else if(req.body.type=='private') var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='private' AND data='"+req.body.date+"' GROUP BY hora;";
    else var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND data='"+req.body.date+"' GROUP BY hora;";
    var query = BD.query(sqlStr, function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/filterReservations',(req, res) => {
    var sqlExtra="";
    var order = req.body.order;
    if(order=="" || order==undefined) order="data desc, hora";
    if(req.body.id!="") sqlExtra+= " AND ID="+req.body.id;
    if(req.body.tour!="") sqlExtra+= " AND tour='"+req.body.tour+"'";
    if(req.body.date!="") sqlExtra+= " AND data='"+req.body.date+"'";
    if(req.body.fname!="") sqlExtra+= " AND primeiroNome='"+req.body.fname+"'";
    if(req.body.lname!="") sqlExtra+= " AND ultimoNome='"+req.body.lname+"'";
    if(req.body.email!="") sqlExtra+= " AND email='"+req.body.email+"'";
    if(req.body.telefone!="") sqlExtra+= " AND telefone='"+req.body.telefone+"'";
    var query = BD.query("SELECT * FROM bookings WHERE data>'2000-01-01'"+sqlExtra+" ORDER BY "+order, function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/deleteReservation',(req, res) => {
    var sqlCommand = "UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE data>'2000-01-01' AND ID="+req.body.id
    var query = BD.query(sqlCommand, function(err,sqlRes) {
        if (err) console.log(err)
        res.send({ client: sqlRes });
    });
});

app.post('/simpleModReservation',(req, res) => {
    var sqlExtra="";
    if(req.body.fName!="") sqlExtra+= " primeiroNome='"+req.body.fName+"',";
    if(req.body.lName!="") sqlExtra+= " ultimoNome='"+req.body.lName+"',";
    if(req.body.email!="") sqlExtra+= " email='"+req.body.email+"',"; 
    if(req.body.tel!="") sqlExtra+= " telefone='"+req.body.tel+"',";
    if(req.body.obs!="") sqlExtra+= " observacoes='"+req.body.obs+"',";
    if(req.body.preco!="") sqlExtra+= " preco='"+req.body.preco+"',";
    if(req.body.receber!="") sqlExtra+= " aReceber='"+req.body.receber+"',"; 
    if(req.body.pagar!="") sqlExtra+= " aPagar='"+req.body.pagar+"',";
    sqlExtra = sqlExtra.slice(0, -1);
    BD.query("UPDATE bookings SET "+sqlExtra+" WHERE ID='"+req.body.id+"' AND  data>'2000-01-01';", function(err,sqlRes) {
        if (err) console.log(err);
        if(sqlRes[0]==null){
            res.send({ mod: "NULL" });
            return;
        }else res.send({ mod: "OK" });
    });
});

app.post('/deleteANDinsertReservation',(req, res) => {
    var price,lugares;
    BD.query("SELECT * FROM bookings WHERE ID='"+req.body.id+"' AND  data>'2000-01-01';", function(err,sqlRes) {
        if (err) console.log(err);
        if(sqlRes[0]==null){
            res.send({ mod: "NULL" });
            return;
        }
        if(req.body.date==""){
            date = JSON.stringify(sqlRes[0].data);
            date =date.replace("T00:00:00.000Z", "");
            date =date.replace('"', '');
            date =date.replace('"', '');
        }else{
            date = req.body.date;
        }
        var pNome= req.body.fName;
        var uNome= req.body.lName;
        var mail= req.body.email; 
        var tel= req.body.tel;
        var text= req.body.obs;
        var receber= req.body.receber; 
        var pagar=req.body.pagar;
        var adults=req.body.adults;
        var children=req.body.children;
        var babys= req.body.baby;        
        var time = req.body.time;
        var tour = req.body.tour;
        var date = req.body.date;
        if(req.body.fName=="") pNome = sqlRes[0].primeiroNome;
        if(req.body.lName=="") uNome = sqlRes[0].ultimoNome;
        if(req.body.email=="") mail = sqlRes[0].email;
        if(req.body.tel=="") tel = sqlRes[0].telefone;
        if(req.body.obs=="") text = sqlRes[0].observacoes;
        if(req.body.receber=="") receber = sqlRes[0].aReceber;
        if(req.body.pagar=="") pagar = sqlRes[0].aPagar;
        if(req.body.baby=="") babys = sqlRes[0].bebes;
        if(req.body.time=="same;") time = sqlRes[0].hora;
        if(req.body.tour=="same") tour = sqlRes[0].tour;
        if(req.body.date==""){
            date = JSON.stringify(sqlRes[0].data);
            date =date.replace("T00:00:00.000Z", "");
            date =date.replace('"', '');
            date =date.replace('"', '');
        } 
        if(adults=="" && children =="") {
            lugares = sqlRes[0].lugares;
            price = sqlRes[0].preco;
        }else {
            var bAdulto = 30;
            var bCrianca = 15;
            lugares =  parseInt(adults, 10)+parseInt(children, 10);
            if (tour=="normal") {
                bAdulto = 30;
                bCrianca = 15;
                price = (parseInt(adults, 10)*bAdulto)+(parseInt(children, 10)*bCrianca);
            }
            else if (tour=="private") {
                lugares=10;
                price = 300;
            }
            else if(tour=="express") {
                bAdulto = 20;
                bCrianca = 12.5;
                price = (parseInt(adults, 10)*bAdulto)+(parseInt(children, 10)*bCrianca);
            }
        }
        var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour!='express' AND hora='"+time+"' AND data='"+date+"' AND ID!='"+req.body.id+"' GROUP BY hora;";
        if(tour=='express')  sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND hora='"+time+"' AND data='"+date+"' AND ID!='"+req.body.id+"' GROUP BY hora;";
        BD.query(sqlStr, function(err,sqlRes2) {
            if (err) console.log(err);
            if (sqlRes2[0]==null || (sqlRes2[0]['SUM(lugares)']+parseInt(lugares, 10)<=10 && sqlRes2[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){
                BD.query("UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE ID="+req.body.id, function(err,sqlRes) {
                    if (err) console.log(err);
                });
                var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `aReceber`, `aPagar` ) ";
                booking += "VALUES ('"+pNome+"','"+uNome+"','"+mail+"','"+tel+"','"+tour+"',"+lugares+","+babys+", '"+text+"', '"+date+"','"+time+"', "+price+",'"+receber+"', '"+pagar+"')";        
                BD.query(booking, function(err,sqlRes3) {
                    if (err) console.log(err);
                });
                res.send({ mod: "OK" });
            }else{
                res.send({ mod: "ERROR" });
            }
        });
    });
});