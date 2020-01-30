const path = require('path');
const host = '0.0.0.0';
const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql');
var bAdultoN = 3000;
var bCriancaN = 1500;
var bAdultoE = 2000;
var bCriancaE = 1250;

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
    if (err) {
        console.log(err);
        console.log('Some errors ocurred while connecting to database');
        return;
    }
    console.log('Connected to database without errors');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.listen(port, host, function() {//poe o sv a correr
	console.log('Running at: ',host,port);
});

app.post('/Reservation',(req, res) => {
    var sqlStr, price, seats;
    var adults = req.body.adults;
    console.log(adults);
    if (adults==0) return;
    var children = req.body.children;
    var mail = req.body.email;
    var text = req.body.obs;
    var time = req.body.time;
    var tour = req.body.tour;
    var babys = req.body.baby;
    var pNome = req.body.fName;
    var uNome = req.body.lName;
    var tel = req.body.tel;
    var date = req.body.date;
    if (tour=="normal") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND hora= ? AND data= ? GROUP BY hora;";
        price = (((parseInt(adults, 10)*bAdultoN)+(parseInt(children, 10)*bCriancaN))/100);
        seats = parseInt(adults, 10)+parseInt(children, 10);
    }
    else if (tour=="private") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        seats=10;
        price = 300;
        time="18h-20h;";
    }
    else if(tour=="express") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        price = (((parseInt(adults, 10)*bAdultoE)+(parseInt(children, 10)*bCriancaE))/100);
        time="13h-14h;";
        seats = parseInt(adults, 10)+parseInt(children, 10);
    }
    console.log(sqlStr);
    BD.query(sqlStr,[time,date], function(err,sqlRes) {
        if (err) console.log(err);
        if (sqlRes[0]==null || (sqlRes[0]['SUM(lugares)']+parseInt(seats, 10)<=10 && sqlRes[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){
            var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`) ";
            booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            console.log(booking);
            BD.query(booking, [pNome,uNome,mail,tel,tour,seats,babys,text,date,time,price], function(err,sqlRes) {if (err) console.log(err);});
            res.send({ insert: "OK" });
        }else{
            res.send({ insert: "ERROR" });
        }
    });
});

app.post('/getNormalBookings',(req, res) => {
    BD.query("SELECT data, GROUP_CONCAT(hora SEPARATOR '; ') FROM bookings WHERE data>=current_date AND tour!='express' GROUP BY data;", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getPrivateBookings',(req, res) => {
    BD.query("SELECT * FROM `bookings` WHERE data>=current_date AND tour='private'", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getExpressBookings',(req, res) => {
    BD.query("SELECT * FROM `bookings` WHERE data>=current_date AND tour='express'", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getDateBooking',(req, res) => {
    if (req.body.type=='express')  var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND data= ? GROUP BY hora;";
    else if(req.body.type=='private') var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='private' AND data= ? GROUP BY hora;";
    else var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND data= ? GROUP BY hora;";
    BD.query(sqlStr, [req.body.date], function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/filterReservations',(req, res) => {
    var sqlExtra="";
    var order =req.body.order;
    if(order=="" || order==undefined) order="data desc, hora";
    if(req.body.fname!="") sqlExtra+= " AND primeiroNome="+mysql.escape(req.body.fname);
    if(req.body.tour!="") sqlExtra+= " AND tour="+mysql.escape(req.body.tour);
    if(req.body.date!="") sqlExtra+= " AND data="+mysql.escape(req.body.date);
    if(req.body.lname!="") sqlExtra+= " AND ultimoNome="+mysql.escape(req.body.lname);
    if(req.body.email!="") sqlExtra+= " AND email="+mysql.escape(req.body.email);
    if(req.body.telefone!="") sqlExtra+= " AND telefone="+mysql.escape(req.body.telefone);
    if(req.body.id!="") sqlExtra+= " AND ID="+mysql.escape(+req.body.id);
    BD.query("SELECT * FROM bookings WHERE data>'2000-01-01'"+sqlExtra+" ORDER BY "+order, function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/deleteReservation',(req, res) => {
    var sqlCommand = "UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE data>'2000-01-01' AND ID= ?";
    BD.query(sqlCommand, [req.body.id],function(err,sqlRes) {
        if (err) console.log(err)
        res.send({ client: sqlRes });
    });
});

app.post('/simpleModReservation',(req, res) => {
    var sqlExtra="";
    if(req.body.fName!="") sqlExtra+= " primeiroNome="+mysql.escape(req.body.fName)+",";
    if(req.body.lName!="") sqlExtra+= " ultimoNome="+mysql.escape(req.body.lName)+",";
    if(req.body.email!="") sqlExtra+= " email="+mysql.escape(req.body.email)+",";
    if(req.body.tel!="") sqlExtra+= " telefone="+mysql.escape(req.body.tel)+",";
    if(req.body.obs!="") sqlExtra+= " observacoes="+mysql.escape(req.body.obs)+",";
    if(req.body.preco!="") sqlExtra+= " preco="+mysql.escape(req.body.preco)+",";
    if(req.body.receber!="") sqlExtra+= " aReceber="+mysql.escape(req.body.receber)+",";
    if(req.body.pagar!="") sqlExtra+= " aPagar="+mysql.escape(req.body.pagar)+",";
    sqlExtra = sqlExtra.slice(0, -1);
    BD.query("UPDATE bookings SET "+sqlExtra+" WHERE ID= ? AND  data>'2000-01-01';",[req.body.id], function(err,sqlRes) {
        if (err) console.log(err);
        if(sqlRes.changedRows==0) res.send({ mod: "NULL" });
        else res.send({ mod: "OK" });
    });
});

app.post('/deleteANDinsertReservation',(req, res) => {
    var price,lugares;
    BD.query("SELECT * FROM bookings WHERE ID= ? AND  data>'2000-01-01';",[req.body.id], function(err,sqlRes) {
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
            lugares =  parseInt(adults, 10)+parseInt(children, 10);
            if (tour=="normal") {
                price = (((parseInt(adults, 10)*bAdultoN)+(parseInt(children, 10)*bCriancaN))/100);
            }
            else if (tour=="private") {
                lugares=10;
                price = 300;
            }
            else if(tour=="express") {
                price = (((parseInt(adults, 10)*bAdultoE)+(parseInt(children, 10)*bCriancaE))/100);
            }
        }
        var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour!='express' AND hora= ? AND data= ? AND ID!= ? GROUP BY hora;";
        if(tour=='express')  sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND hora= ? AND data= ? AND ID!= ? GROUP BY hora;";
        BD.query(sqlStr,[time,date,req.body.id], function(err,sqlRes2) {
            if (err) console.log(err);
            if (sqlRes2[0]==null || (sqlRes2[0]['SUM(lugares)']+parseInt(lugares, 10)<=10 && sqlRes2[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){
                BD.query("UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE ID="+req.body.id, function(err,sqlRes) {
                    if (err) console.log(err);
                });
                var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `aReceber`, `aPagar` ) ";
                booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";        
                BD.query(booking, [pNome,uNome,mail,tel,tour,lugares,babys,text,date,time,price,receber,pagar],function(err,sqlRes3) {
                    if (err) console.log(err);
                });
                res.send({ mod: "OK" });
            }else{
                res.send({ mod: "ERROR" });
            }
        });
    });
});