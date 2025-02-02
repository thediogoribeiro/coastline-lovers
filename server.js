const keys = require('./stripe/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const path = require('path');
const host = '0.0.0.0';
const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var bAdultoN = 3000;
var bCriancaN = 1500;
var bAdultoE = 2000;
var bCriancaE = 1250;
var adminUser ="admin";
var adminPW ="55555";
var promo = ["promo123", "promo000"];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

var BD;
function handleDisconnect() {
    BD = mysql.createConnection({
        host : 'us-cdbr-iron-east-04.cleardb.net', //localhost
        user : 'bb3571693f7bee', //root
        password : 'a192f195', //root
        //port : '8889',
        database : 'heroku_3a464d27dbd82c7'
    });  // Recreate the connection, since the old one cannot be reused.
    BD.connect( function onConnect(err) {   // The server is either down
        if (err) {                                  // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 10000);    
        }
        console.log('Connected to database without errors');                                          
    });                                            
    BD.on('error', function onError(err) {
        console.log('db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {   
            handleDisconnect();                         
        } else {                                        
            throw err;                                  
        }
    });
}
handleDisconnect();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.listen(process.env.PORT || 3000)

app.get('/Administrador', function(request, response){
    response.sendFile(path.join(__dirname + '/public/views/admin.html'));
});

app.post('/checkAdmin',(req, res) => {
    if(adminPW==req.body.pw && adminUser==req.body.user) res.send({ res: "ok" });
    else res.send({ res: "Wrong admin" });
});

app.post('/FreeReservation',(req, res) => {
    if (!promo.includes(req.body.code) && req.body.code!=adminPW){
        res.send({ code: "NO" });
        return;
    }
    var sqlStr, price, seats;
    var adults = req.body.adults;
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
        price = (parseInt(adults, 10)*bAdultoN)+(parseInt(children, 10)*bCriancaN);
        seats = parseInt(adults, 10)+parseInt(children, 10);
    }
    else if (tour=="private") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        seats=10;
        price = 30000;
        time="18h-20h;";
    }
    else if(tour=="express") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        price = (parseInt(adults, 10)*bAdultoE)+(parseInt(children, 10)*bCriancaE);
        time="13h-14h;";
        seats = parseInt(adults, 10)+parseInt(children, 10);
    }
    price = price/100;
    BD.query(sqlStr,[time,date], function(err,sqlRes) {
        if (err) console.log(err);
        if (sqlRes[0]==null || (sqlRes[0]['SUM(lugares)']+parseInt(seats, 10)<=10 && sqlRes[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){
            var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `promotor`, `stripeID`, `codigoPromo` ) ";
            booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'FREE', ?)";
            BD.query(booking, [pNome,uNome,mail,tel,tour,seats,babys,text,date,time,price,req.body.code,req.body.promo], function(err,sqlRes) {if (err) console.log(err);});
            if(adminPW==req.body.code) res.send({ code: "ADMIN" });
            else if(promo.includes(req.body.code)) res.send({ code: "PROMO" });
        }else{
            res.send({ code: "FULL" });
        }
    });
});

app.post('/PaidReservation',(req, res) => {
    var sqlStr, price, seats;
    var adults = req.body.adults;
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
        price = (parseInt(adults, 10)*bAdultoN)+(parseInt(children, 10)*bCriancaN);
        seats = parseInt(adults, 10)+parseInt(children, 10);
    }
    else if (tour=="private") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        seats=10;
        price = 30000;
        time="18h-20h;";
    }
    else if(tour=="express") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        price = (parseInt(adults, 10)*bAdultoE)+(parseInt(children, 10)*bCriancaE);
        time="13h-14h;";
        seats = parseInt(adults, 10)+parseInt(children, 10);
    }
    stripe.charges.create({
        amount: price,
        source: req.body.stripeTokenId,
        currency: 'eur'
      }).then(charge =>  {
            price = price/100;
            BD.query(sqlStr,[time,date], function(err,sqlRes) {
                if (err) console.log(err);
                if (sqlRes[0]==null || (sqlRes[0]['SUM(lugares)']+parseInt(seats, 10)<=10 && sqlRes[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){
                    var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `stripeID`, `codigoPromo` ) ";
                    booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    BD.query(booking, [pNome,uNome,mail,tel,tour,seats,babys,text,date,time,price,charge.id,req.body.promo], function(err,sqlRes) {if (err) console.log(err);});
                    res.send({ insert: "OK" });
                }else{
                    res.send({ insert: "ERROR" });
                }
        });
        }).catch(error => {
            console.log(error);
            res.status(500).end();
        })
});

app.post('/getNormalBookings',(req, res) => {
    BD.query("SELECT data, GROUP_CONCAT(hora SEPARATOR '; ') FROM bookings WHERE data>=current_date AND tour!='express' GROUP BY data;", function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getPrivateBookings',(req, res) => {
    if(req.body.code!=adminPW) return;
    BD.query("SELECT * FROM `bookings` WHERE tour='private' OR (tour='normal' AND hora='18h-20h;')", function(err,sqlRes) {
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
    var sqlStr = "";
    if (req.body.type=='express')  sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND data= ? GROUP BY hora;";
    else if(req.body.type=='private') sqlStr = "SELECT tour, SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='private' OR (tour='normal' AND hora='18h-20h;')) AND data= ? GROUP BY hora";
    else sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND data= ? GROUP BY hora;";
    BD.query(sqlStr, [req.body.date], function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/filterReservations',(req, res) => {
    if(req.body.code!=adminPW) return;
    var sqlExtra="";
    var order =req.body.order;
    if(order=="" || order==undefined) order="data desc, hora";
    if(req.body.fname!="") sqlExtra+= " AND primeiroNome LIKE '%"+req.body.fname+"%'";
    if(req.body.tour!="") sqlExtra+= " AND tour="+mysql.escape(req.body.tour);
    if(req.body.date!="") sqlExtra+= " AND data="+mysql.escape(req.body.date);
    if(req.body.lname!="") sqlExtra+= " AND ultimoNome LIKE '%"+req.body.lname+"%'";;
    if(req.body.email!="") sqlExtra+= " AND email LIKE '%"+req.body.email+"%'";;
    if(req.body.telefone!="") sqlExtra+= " AND telefone LIKE '%"+req.body.telefone+"%'";;
    if(req.body.id!="") sqlExtra+= " AND (ID="+mysql.escape(+req.body.id)+" OR oldID="+mysql.escape(+req.body.id)+")";
    BD.query("SELECT * FROM bookings WHERE data>'2000-01-01'"+sqlExtra+" ORDER BY "+order, function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/deleteReservation',(req, res) => {
    if(req.body.code!=adminPW) return;
    var sqlCommand = "UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE data>'2000-01-01' AND ID= ? OR oldID= ?";
    BD.query(sqlCommand, [req.body.id,req.body.id],function(err,sqlRes) {
        if (err) console.log(err)
        res.send({ client: sqlRes });
    });
});

app.post('/simpleModReservation',(req, res) => {
    if(req.body.code!=adminPW) return;
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
    BD.query("UPDATE bookings SET "+sqlExtra+" WHERE (ID= ? OR oldID= ?) AND  data>'2000-01-01';",[req.body.id,req.body.id], function(err,sqlRes) {
        if (err) console.log(err);
        if(sqlRes.changedRows==0) res.send({ mod: "NULL" });
        else res.send({ mod: "OK" });
    });
});

app.post('/deleteANDinsertReservation',(req, res) => {
    if(req.body.code!=adminPW) return;
    var price,lugares;
    BD.query("SELECT * FROM bookings WHERE (ID= ? OR oldID= ?) AND  data>'2000-01-01';",[req.body.id,req.body.id], function(err,sqlRes) {
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
        if(adults=="") adults=0;
        if(children=="") children=0;
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
        if(adults==0 && children ==0) {
            lugares = sqlRes[0].lugares;
            price = sqlRes[0].preco;
        }else {
            lugares =  parseInt(adults)+parseInt(children);
            if (tour=="normal") {
                price = (((parseInt(adults)*bAdultoN)+(parseInt(children)*bCriancaN))/100);
            }
            else if (tour=="private") {
                lugares=10;
                price = 300;
            }
            else if(tour=="express") {
                price = (((parseInt(adults)*bAdultoE)+(parseInt(children)*bCriancaE))/100);
            }
        }
        var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour!='express' AND hora= ? AND data= ? AND ID!= ? AND oldID!= ? GROUP BY hora;";
        if(tour=='express')  sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND hora= ? AND data= ? AND ID!= ? AND oldID!= ? GROUP BY hora;";
        BD.query(sqlStr,[time,date,req.body.id,req.body.id], function(err,sqlRes2) {
            if (err) console.log(err);
            if (sqlRes2[0]==null || (sqlRes2[0]['SUM(lugares)']+parseInt(lugares)<=10 && sqlRes2[0]['SUM(bebes)']+parseInt(babys)<=3)){
                BD.query("UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE (ID= ? OR oldID= ?)", [req.body.id,req.body.id],function(err,sqlRes) {
                    if (err) console.log(err);
                });
                var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `aReceber`, `aPagar`, `oldID` ) ";
                booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";        
                BD.query(booking, [pNome,uNome,mail,tel,tour,lugares,babys,text,date,time,price,receber,pagar,req.body.id],function(err,sqlRes3) {
                    if (err) console.log(err);
                    res.send({ mod: "OK" ,id:sqlRes3.insertId});
                });
            }else{
                res.send({ mod: "ERROR" });
            }
        });
    });
});