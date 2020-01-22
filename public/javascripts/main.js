var currDay, currMonth, currYear, selectedDay, selectedMonth, selectedYear, date;
var lugaresMax = [10,10,10,10,10];
var bebeLugaresMax = [3,3,3,3,3];
var adultCount = 0;
var criancaCount = 0;
var bebeCount = 0;
var price = 0;
var maxSeats = 10;
var bebeMaxSeats = 3;
var tour="normal";
var conditions = ["9h-11h", "11h-13h", "14h-16h", "16h-18h", "18h-20h"];


window.onload = function() {
	date = new Date();
	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	currDay = day;
	currMonth = month;
	currYear = year;	
	let selectedDate = date;
	selectedDay = day;
	selectedMonth = month+1;
	selectedYear = year;
	console.log(selectedDay, selectedMonth, selectedYear);
	getSeatsFromDate();
	document.getElementById('dateField').value = selectedDay + "/"+ selectedMonth +"/"+selectedYear;
};

function dateSelected(){
	var str = document.getElementById('dateField').value;
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
	console.log(currDate);
	console.log(selDate);
	console.log(currStrDate);
	console.log(selStrDate);
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
	}else{
		document.getElementById('required2').innerHTML = "*";
	}
	if (field3.value==""){
		document.getElementById('required3').innerHTML = "Insira o seu 'Email'";
		flag=1;
	}else{
		document.getElementById('required3').innerHTML = "*";
	}
	if (field4.value==""){
		document.getElementById('required4').innerHTML = "Insira o seu 'Telefone'";
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
		if (cb1.checked)time = "9h-11h;";
		else if (cb2.checked)time = " 11h-13h;";
		else if (cb3.checked)time = " 14h-16h;";
		else if (cb4.checked)time = " 16h-18h;";
		else if (cb5.checked)time = " 18h-20h;";
		sendReservation(selectedDay, selectedMonth, selectedYear, time, field1.value, field2.value, field3.value, field4.value, field5.value, tour);
	}
	return false;
}

function cleanDate(date){
	date = date.split(" ").join("");
	var index = date.indexOf("/");
	var dia = date.substring(0,index);
	date = date.substring(index+1);
	index = date.indexOf("/");
	var mes =date.substring(0,index);
	var ano = date.substring(index+1);
	return {d: dia, m: mes, a: ano};
}
async function sendReservation(dia, mes, ano, horas, fname, lname, mail, tel, text, type){
	var lugares, preco, barco;
	if(type=="normal"){
		lugares = (adultCount+criancaCount);
		preco = (adultCount*30)+(criancaCount*15);
		barco = 1;
	}else if(type=="private"){
		lugares = 10;
		preco = 300;
		horas="18h-20h";
		barco = 2;
	}else{
		lugares = (adultCount+criancaCount);
		preco = (adultCount*20)+(criancaCount*12.5);
		horas="13h-14h";
		barco = 3;
	}
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({y:ano, m:mes, d:dia, time:horas, fname:fname, lname:lname, mail:mail, tel:tel, text:text, seats:lugares,price:preco, type:type, boat:barco, baby:bebeCount})
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
	if(tour=="normal") barco = 1;
	else if(tour=="private") barco = 2;
	else if(tour=="express") barco = 3;
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
					body: JSON.stringify({type:barco, date:ano+'-'+mes+'-'+dia})
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
	if(tour=="normal"){
		document.getElementById("cb1").checked = true;
		var barco = 1;
	}else if(tour=="private"){
		document.getElementById("cbprivate").checked = true;
		var barco = 2;
	}else if(tour=="express"){
		document.getElementById("cbexpress").checked = true;
		var barco = 3;
	}
	var finaldate = selectedYear+'-'+selectedMonth+'-'+selectedDay;
	const options = {
		method: 'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({type:barco, date:finaldate})
	};
	const res = await fetch('/getDateBooking', options);
	const data = await res.json();
	if(tour=="normal"){
		if(data.bookings[0]==null){
			document.getElementById("cb1Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb2Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb3Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb4Text").innerHTML = " (10 lugares livres)";
			document.getElementById("cb5Text").innerHTML = " (10 lugares livres)";
			document.getElementById("bebeSeatsNum").innerHTML = " (3 lugares livres)";
		}
		for(var i = 0; i < data.bookings.length; i++){
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("9h-11h")){
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
		barco = 2;
		if(data.bookings[0]==null) {
			maxSeats=10;
			bebeMaxSeats=3;
		}else {
			maxSeats = 0;
			bebeMaxSeats=0;
		}
	}else if(tour=="express"){
		maxSeats=10;
		if (data.bookings[0]!=null) {
			maxSeats = (10-data.bookings[0]["SUM(lugares)"]);
			bebeLugaresMax[0] = (3-data.bookings[0]["SUM(bebes)"]);
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
	document.getElementById('dateField').value = selectedDay + "/"+ selectedMonth +"/"+selectedYear;
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

