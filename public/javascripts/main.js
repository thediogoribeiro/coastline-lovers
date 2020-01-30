var currDay, currMonth, currYear, selectedDay, selectedMonth, selectedYear, date;
var newOrder, oldOrder;
var lugaresMax = [10,10,10,10,10];
var bebeLugaresMax = [3,3,3,3,3];
var adultCount = 0;
var criancaCount = 0;
var bebeCount = 0;
var price = 0;
var maxSeats = 10;
var bebeMaxSeats = 3;
var tour="normal";
var conditions = ["09h-11h", "11h-13h", "14h-16h", "16h-18h", "18h-20h"];
var strangeChars = [",","&","'","!",'"',"#","+","*","(","?",";",":",")"];



window.onload = function() {
	showAllBookings("",0,"","","","","");
	date = new Date();
	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	currDay = day;
	currMonth = month;
	currYear = year;	
	selectedDay = day;
	selectedMonth = month+1;
	selectedYear = year;
	getSeatsFromDate();
	document.getElementById('date_Field').value = selectedDay + "/"+ selectedMonth +"/"+selectedYear;
};

function convertDateFromat(str){
	var index = str.indexOf("/");
	var month = str.substring(0,index);
	str = str.substring(index+1);
	index = str.indexOf("/");
	var day = str.substring(0,index);
	var year = str.substring(index+1);
	return year+"-"+month+"-"+day;
}

function dateSelected(){
	var str = document.getElementById('date_Field').value;
	var index = str.indexOf("/");
	selectedMonth = str.substring(0,index);
	str = str.substring(index+1);
	index = str.indexOf("/");
	selectedDay = str.substring(0,index);
	selectedYear = str.substring(index+1);
	getSeatsFromDate();
}

function reserva(){
	var flag = 0;
	const currDate = new Date();
	const selDate = new Date(selectedYear,(selectedMonth-1),selectedDay);
	const currStrDate = currDate.getFullYear()+"-"+currDate.getMonth()+"-"+currDate.getDate();
	const selStrDate = selDate.getFullYear()+"-"+selDate.getMonth()+"-"+selDate.getDate();
	const cb1 = document.getElementById('cb1');
	const cb2 = document.getElementById('cb2');
	const cb3 = document.getElementById('cb3');
	const cb4 = document.getElementById('cb4');
	const cb5 = document.getElementById('cb5');
	const field1 = document.getElementById('field1');
	const field2 = document.getElementById('field2');
	const field3 = document.getElementById('field3');
	const field4 = document.getElementById('field4');
	const field5 = document.getElementById('field5');
	if (tour=="normal" && !cb1.checked && !cb2.checked && !cb3.checked && !cb4.checked && !cb5.checked){
		document.getElementById('required1').innerHTML = "Selecione pelo menos uma hora";
		flag=1;
	}else{
		document.getElementById('required1').innerHTML = "*";
	}
	if (field1.value=="" || field2.value==""){
		document.getElementById('required2').innerHTML = "Preencha ambos os campos do seu nome";
		flag=1;
	}else if (strangeChars.some(el => field2.value.includes(el)) || strangeChars.some(el => field1.value.includes(el))){
		document.getElementById('required2').innerHTML = "Nome inválido";
		flag=1;
	}else{
		document.getElementById('required2').innerHTML = "*";
	}
	if (field3.value==""){
		document.getElementById('required3').innerHTML = "Insira o seu 'Email'";
		flag=1;
	}else if (strangeChars.some(el => field3.value.includes(el)) ){
		document.getElementById('required3').innerHTML = "Email inválido";
		flag=1;
	}else{
		document.getElementById('required3').innerHTML = "*";
	}
	if (field4.value==""){
		document.getElementById('required4').innerHTML = "Insira o seu 'Telefone'";
		flag=1;
	}else if (!onlyDigit(field4.value)){
		document.getElementById('required4').innerHTML = "Telefone inválido";
		flag=1;
	}else{
		document.getElementById('required4').innerHTML = "*";
	}
	if(adultCount==0 && criancaCount==0 && tour!="private"){
		document.getElementById('required5').innerHTML = "Selecione o número de bilhetes";
		flag=1;
	}else if(tour=="private" && maxSeats==0){
		document.getElementById('required5').innerHTML = "Esta 'tour' já está reservada";
		flag=1;
	}else{
		document.getElementById('required5').innerHTML = "*";
	}
	if(currStrDate==selStrDate){
		document.getElementById('required6').innerHTML = "*";
	}else if(currDate>selDate){
		document.getElementById('required6').innerHTML = "Data inválida";
		flag=1;
	}else{
		document.getElementById('required6').innerHTML = "*";
	}
	if (flag==0){
		var time = ""
		if (cb1.checked)time = "09h-11h;";
		else if (cb2.checked)time = "11h-13h;";
		else if (cb3.checked)time = "14h-16h;";
		else if (cb4.checked)time = "16h-18h;";
		else if (cb5.checked)time = "18h-20h;";
		sendReservation(selectedDay, selectedMonth, selectedYear, time, field1.value, field2.value, field3.value.toLowerCase(), field4.value, field5.value, tour);
	}
	return false;
}

async function sendReservation(dia, mes, ano, horas, fname, lname, mail, tel, text, type){
	var date = ano+"-"+mes+"-"+dia
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({date:date, time:horas, fName:fname, lName:lname, email:mail, tel:tel, obs:text, adults:adultCount,children:criancaCount, type:type, tour:type, baby:bebeCount})
	};
	const res = await fetch('/Reservation', options);
	const data = await res.json();
	location.reload();	
}

async function getPrivateBookings(){
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({})
	};
	const res = await fetch('/getPrivateBookings', options);
	const data = await res.json();
	for (var i = 0; i < data.bookings.length; i++){
		var str = data.bookings[i].data;
		str = str.replace("T00:00:00.000Z", "");
		var index = str.indexOf("-");
		var ano = str.substring(0,index);
		str = str.substring(index+1);
		index = str.indexOf("-");
		var mes =str.substring(0,index);
		var dia = str.substring(index+1);
		finaldate = dia+" / "+mes+" / "+ano;
		var dayDiv = document.getElementById(finaldate);
		if(dayDiv!=null) dayDiv.style.backgroundColor = "red";
	}
}

async function getNormalBookings(){
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({})
	};
	const res = await fetch('/getNormalBookings', options);
	const data = await res.json();	
	for (var i = 0; i < data.bookings.length; i++){
		var horas = data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"];
		var str = data.bookings[i].data;
		str = str.replace("T00:00:00.000Z", "");
		var index = str.indexOf("-");
		var ano = str.substring(0,index);
		str = str.substring(index+1);
		index = str.indexOf("-");
		var mes =str.substring(0,index);
		var dia = str.substring(index+1);
		const finaldate = dia+" / "+mes+" / "+ano;
		var dayDiv = document.getElementById(finaldate);
		if(dayDiv!=null){
			if (conditions.every(el => horas.includes(el))){
				const opts = {
					method: 'POST',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify({type:tour, date:ano+'-'+mes+'-'+dia})
				};
				const res2 = await fetch('/getDateBooking', opts);
				const data2 = await res2.json();
				var flag=0;
				if(data2.bookings.length==5){
					for(var j = 0; j <5;j++){
						if(data2.bookings[j]['SUM(lugares)']<10) flag=1;
					}
					if(flag==1) dayDiv.style.backgroundColor = "yellow";
					else dayDiv.style.backgroundColor = "red"; 
				}				
			}else if (conditions.some(el => horas.includes(el))) dayDiv.style.backgroundColor = "yellow"; 
		} 
	}
}

async function getExpressBookings(){
	const options = {
		method: 'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({})
	};
	const res = await fetch('/getExpressBookings', options);
	const data = await res.json();
	for (var i = 0; i < data.bookings.length; i++){
		var str = data.bookings[i].data;
		str = str.replace("T00:00:00.000Z", "");
		var index = str.indexOf("-");
		var ano = str.substring(0,index);
		str = str.substring(index+1);
		index = str.indexOf("-");
		var mes =str.substring(0,index);
		var dia = str.substring(index+1);
		finaldate = dia+" / "+mes+" / "+ano;
		var dayDiv = document.getElementById(finaldate);
		if(dayDiv!=null && data.bookings[i].lugares>=10) dayDiv.style.backgroundColor = "red"
		if(dayDiv!=null && data.bookings[i].lugares<10) dayDiv.style.backgroundColor = "yellow"
	}
}

async function getSeatsFromDate(){
	resetValues();
	lugaresMax = [10,10,10,10,10];
	bebeLugaresMax = [3,3,3,3,3];
	var finaldate = selectedYear+'-'+selectedMonth+'-'+selectedDay;
	const options = {
		method: 'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({type:tour, date:finaldate})
	};
	const res = await fetch('/getDateBooking', options);
	const data = await res.json();
	if(tour=="normal"){
		document.getElementById("cb1").checked = true;
		if(data.bookings[0]==null){
			document.getElementById("cb1Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb2Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb3Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb4Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb5Text").innerHTML = " (10 lugares livres)";
			document.getElementById("bebeSeatsNum").innerHTML = " (3 lugares livres)";
		}
		for(var i = 0; i < data.bookings.length; i++){
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("09h-11h")){
				lugaresMax[0] = (10-data.bookings[i]["SUM(lugares)"]); 
				bebeLugaresMax[0] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb1').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("11h-13h")){
				lugaresMax[1] = (10-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[1] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb2').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("14h-16h")){
				lugaresMax[2] = (10-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[2] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb3').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("16h-18h")){
				lugaresMax[3] = (10-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[3] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb4').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("18h-20h")){
				lugaresMax[4] = (10-data.bookings[i]["SUM(lugares)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb5').disabled = true;
			}			
			document.getElementById("cb1Text").innerHTML = " ("+ lugaresMax[0] + " lugares livres)";
			document.getElementById("cb2Text").innerHTML = " ("+ lugaresMax[1] + " lugares livres)";
			document.getElementById("cb3Text").innerHTML = " ("+ lugaresMax[2] + " lugares livres)";
			document.getElementById("cb4Text").innerHTML = " ("+ lugaresMax[3] + " lugares livres)";
			document.getElementById("cb5Text").innerHTML = " ("+ lugaresMax[4] + " lugares livres)";
			document.getElementById("bebeSeatsNum").innerHTML = " ("+ bebeLugaresMax[0] + " lugares livres)";
		}
		maxSeats = lugaresMax[0];
		bebeMaxSeats = bebeLugaresMax[0];
	}else if(tour=="private"){
		document.getElementById("cbprivate").checked = true;
		if(data.bookings[0]==null) {
			maxSeats=10;	
			bebeMaxSeats=3;
			document.getElementById("cbprivate").disabled = false;
			document.getElementById("rPrivateText").innerHTML = " (Livre)"
		}else {
			maxSeats = 0;
			bebeMaxSeats=0;
			document.getElementById("cbprivate").disabled = true;
			document.getElementById("rPrivateText").innerHTML = " (Cheio)"
		}
	}else if(tour=="express"){
		document.getElementById("cbexpress").checked = true;
		maxSeats=10;
		if (data.bookings[0]!=null) {
			maxSeats = (10-data.bookings[0]["SUM(lugares)"]);
			bebeLugaresMax[0] = (3-data.bookings[0]["SUM(bebes)"]);
			bebeMaxSeats = bebeLugaresMax[0];
			document.getElementById("bebeSeatsNum").innerHTML = "(" + bebeMaxSeats +" lugares livres)"
		}
		document.getElementById("rExpressText").innerHTML = " ("+ maxSeats + " lugares livres)";
	}
}

function resetValues(){
	document.getElementById('cb1').disabled = false;
	document.getElementById('cb2').disabled = false;
	document.getElementById('cb3').disabled = false;
	document.getElementById('cb4').disabled = false;
	document.getElementById('cb5').disabled = false;
	document.getElementById('required1').innerHTML = "*";
	document.getElementById('required2').innerHTML = "*";
	document.getElementById('required3').innerHTML = "*";
	document.getElementById('required4').innerHTML = "*";
	document.getElementById('required5').innerHTML = "*";
	document.getElementById("adultonum").value=0;
	document.getElementById("ciancanum").value=0;
	document.getElementById("bebenum").value=0;
	document.getElementById('date_Field').value = selectedDay + "/"+ selectedMonth +"/"+selectedYear;
	adultCount = 0;
	criancaCount = 0;
	bebeCount = 0;
}

function paintCallendar(){
	if(tour=="normal"){
		getNormalBookings();
	}else if(tour=="private"){
		getPrivateBookings();
	}else if(tour=="express"){
		getExpressBookings();
	}
}

function adultoMenos(){
	if(adultCount == 0) return
	adultCount--;
	document.getElementById("adultonum").value=adultCount;	
}
function adultoMais(){
	if((adultCount + criancaCount) > (maxSeats-1)) return
	adultCount++;
	document.getElementById("adultonum").value=adultCount;	
}
function criancaMenos(){
	if(criancaCount == 0) return
	criancaCount--;
	document.getElementById("ciancanum").value=criancaCount;	
}
function criancaMais(){
	if((adultCount + criancaCount) > (maxSeats-1)) return
	criancaCount++;
	document.getElementById("ciancanum").value=criancaCount;
}
function bebeMenos(){
	if(bebeCount == 0) return
	bebeCount--;
	document.getElementById("bebenum").value=bebeCount;	
}
function bebeMais(){
	if((bebeCount > (bebeMaxSeats-1)) || adultCount==0) return
	bebeCount++;
	document.getElementById("bebenum").value=bebeCount;
}

function radioClick(radio){
	clearColors();
	if (radio=='1'){
		tour="normal";
		document.getElementById("normaltour").style.display = "block";
		document.getElementById("privatetour").style.display = "none";
		document.getElementById("expresstour").style.display = "none";
		document.getElementById("lugares_adulto").style.display = "block";
		document.getElementById("lugares_crianca").style.display = "block";
		document.getElementById("lugares_bebes").style.display = "block";
		document.getElementById("privatetourdiv").style.display = "none";
		document.getElementById("la-normal").style.display = "block";
		document.getElementById("la-express").style.display = "none";
		document.getElementById("lc-normal").style.display = "block";
		document.getElementById("lc-express").style.display = "none";
	}else if(radio=='2'){
		tour="private";
		document.getElementById("normaltour").style.display = "none";
		document.getElementById("privatetour").style.display = "block";
		document.getElementById("expresstour").style.display = "none";
		document.getElementById("lugares_adulto").style.display = "none";
		document.getElementById("lugares_crianca").style.display = "none";
		document.getElementById("lugares_bebes").style.display = "none";
		document.getElementById("privatetourdiv").style.display = "block";
	}else{
		tour="express";
		document.getElementById("normaltour").style.display = "none";
		document.getElementById("privatetour").style.display = "none";
		document.getElementById("expresstour").style.display = "block";
		document.getElementById("lugares_adulto").style.display = "block";
		document.getElementById("lugares_crianca").style.display = "block";
		document.getElementById("lugares_bebes").style.display = "block";
		document.getElementById("privatetourdiv").style.display = "none";
		document.getElementById("la-normal").style.display = "none";
		document.getElementById("la-express").style.display = "block";
		document.getElementById("lc-normal").style.display = "none";
		document.getElementById("lc-express").style.display = "block";
	}	
	getSeatsFromDate();
}

function clearColors(){
	var month = (currMonth+1);
	if (month<10) month = '0'+month;
	for(var i = 0; i< 32; i++){
		var day = i;
		if (day<10) day = '0'+i;
		var finaldate = day +" / "+month+" / "+currYear;
		var dayDiv = document.getElementById(finaldate);
		if(dayDiv!=null) dayDiv.style.backgroundColor = "transparent";
	}
}

function cbClick(cb){
	maxSeats = (lugaresMax[cb-1]);
	bebeMaxSeats = (bebeLugaresMax[cb-1]);
	adultCount=0;
	criancaCount=0;
	bebeCount=0;
	document.getElementById("bebeSeatsNum").innerHTML = "(" + bebeMaxSeats +" lugares livres)"
	document.getElementById("adultonum").value=0;
	document.getElementById("ciancanum").value=0;
	document.getElementById("bebenum").value=0;
}

async function eliminarReservas(){
    var id = document.getElementById("idField").value;
    if (id=="") {
        swal("Preencha o ID");
        return;
	}
	swal({
		title: "Tem a certeza?",
		text: "Impossivel recuperar reservas eliminadas!",
		icon: "warning",
		buttons: ['Não!','Sim!'],
		dangerMode: true,
	  }).then(async function(isConfirm) {
		if (isConfirm) {
			const options = {
				method: 'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify({id:id})
			};
			const res = await fetch('/deleteReservation', options);
			const data = await res.json();
			if (data.client.affectedRows==1) swal("Sucesso!", "Eliminado com sucesso!", "success");
			else swal("Erro ao eliminar (O ID escolhido existe?)");
			showAllBookings("",0,"","","","","");
		} else {
		  swal("Cancelado", "A reserva não foi cancelada", "error");
		}
	  });
}

async function modReservas(){
    var data;
    var id = document.getElementById("idField").value;
    if (id=="") {
        swal("ERRO", "Preencha o ID", "error");
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
	if(date.includes("/")) date = convertDateFromat(date);
    var e = document.getElementById("newtimeSelect");
    var hora = e.options[e.selectedIndex].value + ";";
    if(parseInt(adultos, 10)+parseInt(criancas, 10)>10) {
        swal("ERRO", "Demasiados lugares", "error");
        return;
    }
    if(bebes>3) {
        swal("ERRO", "Demasiados bebés", "error");
        return;
    }
    if(tour!="express" && hora=="13h-14h;"){
        swal("ERRO", "Hora inválida para essa tour", "error");
        return;
    }
    if(tour=="express" && hora!="13h-14h;"){
        swal("ERRO", "Hora inválida para essa tour", "error");
        return;
    }
    if(tour=="private" && hora!="18h-20h;"){
        swal("ERRO", "Hora inválida para essa tour", "error");
        return;
    }   
    if(fName=="" && lName=="" && tel=="" && email=="" && obs=="" && receber=="" && pagar=="" && tour=="same" && adultos=="" && criancas=="" && bebes=="" && date=="" && hora=="same;") {
        swal("ERRO", "Todos os campos a modificar vazios", "error");
        return;
    }
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
    if(data.mod=="NULL") swal("ERRO", "ID não existe", "error");
    if(data.mod=="ERROR") swal("ERRO", "Vagas ocupadas para esse horaio / data?", "error");
}

function textEnter(tipo){
    if (event.key === "Enter") {
		var id = document.getElementById("idField").value;
        var e = document.getElementById("tourField");
        var tour = e.options[e.selectedIndex].value;
		var date = document.getElementById("dateField").value;
		if(date.includes("/")) date = convertDateFromat(date);
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
        document.getElementById("insert_booking").style.display = "none";
    }else if(rb=="3"){
        document.getElementById("div_search").style.display = "block";
        document.getElementById("sqlresult").style.display = "block";
        document.getElementById("modBookings").style.display = "block";
        document.getElementById("deleteBookings").style.display = "none";
        document.getElementById("insert_booking").style.display = "none";
    }else if(rb=="4"){
        document.getElementById("div_search").style.display = "none";
        document.getElementById("sqlresult").style.display = "none";
        document.getElementById("insert_booking").style.display = "block";
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

function onlyDigit(str) {
	var patt = /^[0-9]*$/;
	if (str.match(patt)==null) return false;
	else return true;
  }

