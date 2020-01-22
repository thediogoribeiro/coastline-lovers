window.onload = function() {
    showAllBookings("",0,"","","","","");
}

function verReservas(){
    var id = document.getElementById("idField").value;
    var barcoID = document.getElementById("tourField").value.toLowerCase();
    var date = document.getElementById("dateField").value;
    var fName = document.getElementById("fNameField").value;
    var lName = document.getElementById("lNameField").value;
    var email = document.getElementById("emailField").value.toLowerCase();
    var tel = document.getElementById("telField").value;
    var boatID =0;
    if (barcoID=="normal") boatID=1;
    else if (barcoID=="private") boatID=2;
    else if (barcoID=="express") boatID=3;
    showAllBookings(id,boatID,date,fName,lName,email,tel);
}

async function eliminarReservas(){
    var id = document.getElementById("idField2").value;
    var email = document.getElementById("emailField2").value.toLowerCase();
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({id:id, email:email})
	};
	const res = await fetch('/deleteReservation', options);
    const data = await res.json();
    showAllBookings("",0,"","","","","");
}

function textEnter(){
    if (event.key === "Enter") {
        verReservas();
    }
}

function adminrChange(rb){
    if (rb === "1") {
        showAllBookings("",0,"","","","","");
        document.getElementById("searchBookings").style.display = "block";
        document.getElementById("deleteBookings").style.display = "none";
        document.getElementById("modBookings").style.display = "none";
    }else if(rb === "2"){
        document.getElementById("deleteBookings").style.display = "block";
        document.getElementById("searchBookings").style.display = "none";
        document.getElementById("modBookings").style.display = "none";
    }else if(rb=="3"){
        document.getElementById("modBookings").style.display = "block";
        document.getElementById("deleteBookings").style.display = "none";
        document.getElementById("searchBookings").style.display = "none";
    }
    
}

async function showAllBookings(id,boat,date,fName,lName,email,tel){
    var sqlr = document.getElementById("sqlresult");
    sqlr.innerHTML="<table id='sqltable'>";
    var sqlTable = document.getElementById("sqltable");
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({id:id, boat:boat,date:date,fname:fName,lname:lName,email:email,telefone:tel})
	};
	const res = await fetch('/adminReservations', options);
    const data = await res.json();
    sqlTable.innerHTML+="<tr><th>ID</th><th>Nome</th><th>Email</th><th>Telefone</th><th>Tour</th><th>NºLugares</th><th>NºBebes</th><th>observações</th><th>Data</th><th>Hora</th><th>Preço</th></tr>";
	for (var i = 0; i < data.bookings.length; i++){
        var date =data.bookings[i].data.replace("T00:00:00.000Z", "");
        if(data.bookings[i].barcoID==1) var tour="Normal";
        else if(data.bookings[i].barcoID==2) var tour="Private";
        else var tour="Express";
        sqlTable.innerHTML+="<tr><td> "+data.bookings[i].ID+" </td><td> "+data.bookings[i].primeiroNome +" "+data.bookings[i].ultimoNome+" </td><td> "+data.bookings[i].email+" </td><td> "+data.bookings[i].telefone+"\
         </td><td> "+tour+" </td><td> "+data.bookings[i].lugares+" </td><td> "+data.bookings[i].bebes+" </td><td> "+data.bookings[i].observacoes+" </td><td> "+date+" </td><td> "+data.bookings[i].hora+"\
          </td><td> "+data.bookings[i].preco+" </td></tr> "; 
    }
    sqlr.innerHTML+="</table>";
}