var newOrder, oldOrder;
window.onload = function() {
    showAllBookings("",0,"","","","","");
}

async function eliminarReservas(){
    var id = document.getElementById("idField").value;
    if (id=="") {
        alert("Preencha o ID");
        return;
    }
    if (confirm("Tem a certeza que quer eliminar a reserva de baixo?")) {
        const options = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({id:id})
        };
        const res = await fetch('/deleteReservation', options);
        const data = await res.json();
        console.log(data.client);
        if (data.client.affectedRows==1) alert("Eliminado com sucesso");
        else alert("Erro ao eliminar (O ID escolhido existe?)");
        showAllBookings("",0,"","","","","");
    }else{
        alert("nada eliminado");
    }
}

async function modReservas(){
    var data;
    var id = document.getElementById("idField").value;
    if (id=="") {
        alert("Preencha o ID");
        return;
    }
    var fName = document.getElementById("newfNameField").value;
    var lName = document.getElementById("newlNameField").value;
    var tel = document.getElementById("newtelField").value;
    var email = document.getElementById("newemailField").value.toLowerCase();
    var obs = document.getElementById("newobsField").value;
    var receber = document.getElementById("newrecField").value;
    var pagar = document.getElementById("newpagField").value.toLowerCase();
    //-----------------------------------------------------------------------
    var e = document.getElementById("newtourField");
    var tour = e.options[e.selectedIndex].value;
    var e3 = document.getElementById("newfieldadults");
    var adultos = e3.options[e3.selectedIndex].value;
    var e4 = document.getElementById("newfieldchildren");
    var criancas = e4.options[e4.selectedIndex].value;
    var e5 = document.getElementById("newfieldbaby");
    var bebes = e5.options[e5.selectedIndex].value;
    var date = document.getElementById("newdateField").value;
    var e = document.getElementById("newtimeSelect");
    var hora = e.options[e.selectedIndex].value + ";";
    if(parseInt(adultos, 10)+parseInt(criancas, 10)>10) {
        alert("Demasiados lugares");
        return;
    }
    if(bebes>3) {
        alert("Demasiados bebés");
        return;
    }
    if(tour!="express" && hora=="13h-14h;"){
        alert("Hora inválida para essa tour");
        return;
    }
    if(tour=="express" && hora!="13h-14h;"){
        alert("Hora inválida para essa tour");
        return;
    }
    if(tour=="private" && hora!="18h-20h;"){
        alert("Hora inválida para essa tour");
        return;
    }   
    if(fName=="" && lName=="" && tel=="" && email=="" && obs=="" && receber=="" && pagar=="" && tour=="same" && adultos=="" && criancas=="" && bebes=="" && date=="" && hora=="same;") {
        alert("Todos os campos a modificar vazios");
        return;
    }
    console.log(tour,adultos,criancas,bebes,date,hora);
    if(tour=="same" && adultos=="" && criancas=="" && bebes=="" && date=="" && hora=="same;"){
        const options = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({id,fName:fName,lName:lName,email:email,tel:tel,obs:obs,receber:receber,pagar:pagar,tour:tour,adults:adultos,children:criancas,baby:bebes,date:date,time:hora})
          };
          const res = await fetch('/simpleModReservation', options);
          data = await res.json();
          showAllBookings(id,0,"","","","","");
    }else{
        const options = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({id,fName:fName,lName:lName,email:email,tel:tel,obs:obs,receber:receber,pagar:pagar,tour:tour,adults:adultos,children:criancas,baby:bebes,date:date,time:hora})
          };
          const res = await fetch('/deleteANDinsertReservation', options);
          data = await res.json();
          showAllBookings("",0,"","","","","");
    }
    console.log(data);
    if(data.mod=="NULL") alert("ID não existe");
    if(data.mod=="ERROR") alert("ERRO: vagas ocupadas para esse horaio / data?");
}

async function inserirReserva(){
    var bAdulto = 30;
    var bCrianca = 15;
    var price = 0;
    var fName = document.getElementById("insertfieldfname").value;
    var lName = document.getElementById("insertfieldlname").value;
    var tel = document.getElementById("insertfieldtel").value;
    var email = document.getElementById("insertfieldemail").value.toLowerCase();
    var obs = document.getElementById("insertfieldobs").value;
    var receber = document.getElementById("insertfieldreceive").value;
    var pagar = document.getElementById("insertfieldpay").value.toLowerCase();
    var e = document.getElementById("insertselecttour");
    var tour = e.options[e.selectedIndex].value;
    var date = document.getElementById("insertfielddate").value;
    var e2 = document.getElementById("insertselecttime");
    var hora = e2.options[e2.selectedIndex].value + ";";
    var e3 = document.getElementById("insertfieldadults");
    var adultos = e3.options[e3.selectedIndex].value;
    var e4 = document.getElementById("insertfieldchildren");
    var criancas = e4.options[e4.selectedIndex].value;
    var e5 = document.getElementById("insertfieldbaby");
    var bebes = e5.options[e5.selectedIndex].value;
    var lugares = parseInt(adultos, 10)+parseInt(criancas, 10);
    if(tour!="express" && hora=="13h-14h;"){
        alert("Hora inválida para essa tour");
        return;
    }
    if(tour=="express" && hora!="13h-14h;"){
        alert("Hora inválida para essa tour");
        return;
    }
    if(tour=="private" && hora!="18h-20h;"){
        alert("Hora inválida para essa tour");
        return;
    }   
    if(lugares>10) {
        alert("Demasiados lugares");
        return;
    }
    if(bebes>3) {
        alert("Demasiados bebés");
        return;
    }
    if(fName=="" || lName=="" || tel=="" || email=="" || tour=="" || date=="" || hora=="") {
        alert("Faltam campos obrigatórios");
        return;
    }
    if (tour=="normal") {
        bAdulto = 30;
        bCrianca = 15;
        price = (adultos*bAdulto)+(criancas*bCrianca);
    }
    else if (tour=="private") {
        lugares=10;
        price = 300;
    }
    else {
        bAdulto = 20;
        bCrianca = 12.5;
        price = (parseInt(adultos, 10)*bAdulto)+(parseInt(criancas, 10)*bCrianca);
    }
    const options = {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({fName:fName,lName:lName,email:email,tel:tel,obs:obs,receber:receber,preco:price,pagar:pagar,tour:tour,seats:lugares,baby:bebes,date:date,time:hora})
      };
      const res = await fetch('/Reservation', options);
      const data = await res.json();
}

function changetour(){
    var e = document.getElementById("insertselecttour");
    var tour = e.options[e.selectedIndex].value;
    if (tour=="normal") document.getElementById("newtimeSelect").selectedIndex = 0;
    else if (tour=="private") document.getElementById("newtimeSelect").selectedIndex = 5;
    else if(tour=="express") document.getElementById("newtimeSelect").selectedIndex = 2;
}

function textEnter(tipo){
    if (event.key === "Enter") {
        var id = document.getElementById("idField").value;
        var e = document.getElementById("tourField");
        var tour = e.options[e.selectedIndex].value;
        var date = document.getElementById("dateField").value;
        var fName = document.getElementById("fNameField").value;
        var lName = document.getElementById("lNameField").value;
        var email = document.getElementById("emailField").value.toLowerCase();
        var tel = document.getElementById("telField").value;
        showAllBookings(id,tour,date,fName,lName,email,tel);
    }
}

function adminrChange(rb){
    if(rb === "2"){
        document.getElementById("div_search").style.display = "block";
        document.getElementById("sqlresult").style.display = "block";
        document.getElementById("deleteBookings").style.display = "block";
        document.getElementById("modBookings").style.display = "none";
        document.getElementById("insertBookings").style.display = "none";
    }else if(rb=="3"){
        document.getElementById("div_search").style.display = "block";
        document.getElementById("sqlresult").style.display = "block";
        document.getElementById("modBookings").style.display = "block";
        document.getElementById("deleteBookings").style.display = "none";
        document.getElementById("insertBookings").style.display = "none";
    }else if(rb=="4"){
        document.getElementById("div_search").style.display = "none";
        document.getElementById("sqlresult").style.display = "none";
        document.getElementById("insertBookings").style.display = "block";
        document.getElementById("deleteBookings").style.display = "none";
        document.getElementById("modBookings").style.display = "none";
    }
    
}

async function showAllBookings(id,tour,date,fName,lName,email,tel,order){
    var sqlr = document.getElementById("sqlresult");
    sqlr.innerHTML="<table id='sqltable'>";
    var sqlTable = document.getElementById("sqltable");
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({id:id, tour:tour,date:date,fname:fName,lname:lName,email:email,telefone:tel,order:order})
	};
	const res = await fetch('/filterReservations', options);
    const data = await res.json();
    sqlTable.innerHTML+="<tr><th class='dedo' onclick=\"order('id')\">ID</th><th>Nome</th><th>Email</th><th>Telefone</th><th class='dedo' onclick=\"order('tour')\">Tour</th><th>NºLugares</th><th>NºBebes</th><th>observações</th><th class='dedo' onclick=\"order('data')\">Data</th><th>Hora</th><th>Preço</th><th>A Receber</th><th>A Pagar</th></tr>";
	for (var i = 0; i < data.bookings.length; i++){
        var date =data.bookings[i].data.replace("T00:00:00.000Z", "");
        sqlTable.innerHTML+="<tr><td> "+data.bookings[i].ID+" </td><td> "+data.bookings[i].primeiroNome +" "+data.bookings[i].ultimoNome+" </td><td> "+data.bookings[i].email+" </td><td> "+data.bookings[i].telefone+"\
         </td><td> "+data.bookings[i].tour+" </td><td> "+data.bookings[i].lugares+" </td><td> "+data.bookings[i].bebes+" </td><td> "+data.bookings[i].observacoes+" </td><td> "+date+" </td><td> "+data.bookings[i].hora+"\
          </td><td> "+data.bookings[i].preco+" </td><td> "+data.bookings[i].aPagar+" </td><td> "+data.bookings[i].aReceber+" </td></tr> "; 
    }
    sqlr.innerHTML+="</table>";
}

function order(o){
    newOrder = o;
    if(newOrder == oldOrder) o=o+" desc";
    showAllBookings("",0,"","","","","",o);
    oldOrder=o;    
}

function tourChange(){
    var e = document.getElementById("tourSelect");
    var tour = e.options[e.selectedIndex].value;
    document.getElementById("normalSelect").style.display = "none";
    document.getElementById("privateSelect").style.display = "none";
    document.getElementById("expressSelect").style.display = "none";
    if (tour=="normal") document.getElementById("normalSelect").style.display = "block";
    else if (tour=="private") document.getElementById("privateSelect").style.display = "block";
    else if (tour=="express") document.getElementById("expressSelect").style.display = "block";
}

function adminReserva(){
    var nAdult = document.getElementById("adultonum").value;
    var ncrianca = document.getElementById("criancanum").value;
    var nbebe = document.getElementById("bebenum").value;
    var pNome = document.getElementById("field1").value;
    var uNome = document.getElementById("field2").value;
    var email = document.getElementById("field3").value;
    var nAdult = document.getElementById("adultonum").value;
    var nAdult = document.getElementById("adultonum").value;
}