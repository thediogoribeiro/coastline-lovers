var allBookings;
var currDay, currMonth, currYear, selectedDay, selectedMonth, selectedYear;
var lugaresMax = [10,10,10,10,10];
var adultCount = 0;
var criancaCount = 0;
var price = 0;
var maxSeats = 10;
var tour="normal";
var conditions = ["9h-11h", "11h-13h", "14h-16h", "16h-18h", "18h-20h"];


window.onload = function() {
 	const date_picker_element = document.getElementById('date-picker');
	const selected_date_element = document.getElementById('selected-date');
	const dates_element = document.getElementById('dates');
	const mth_element = document.getElementById('mth');
	const next_mth_element = document.getElementById('arrows next-mth');
	const prev_mth_element = document.getElementById('arrows prev-mth');
	const days_element = document.getElementById('days'); 
	
	
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	currDay = day;
	currMonth = month;
	currYear = year;
	
	let selectedDate = date;
	selectedDay = day;
	selectedMonth = month;
	selectedYear = year;
	
	mth_element.textContent = months[month] + ' ' + year;
	
	selected_date_element.textContent = formatDate(date);
	selected_date_element.dataset.value = selectedDate;
	
	populateDates();
	getSeatsFromDate(selectedDay, selectedMonth, selectedYear);
	
	// EVENT LISTENERS
	date_picker_element.addEventListener('click', toggleDatePicker);
	next_mth_element.addEventListener('click', goToNextMonth);
	prev_mth_element.addEventListener('click', goToPrevMonth);
	
	// FUNCTIONS
	function toggleDatePicker (e) {
		paintCallendar();
		if (!checkEventPathForClass(e.path, 'dates')) dates_element.classList.toggle('active');
	}
	
	function goToNextMonth (e) {
		month++;
		if (month > 11) {
			month = 0;
			year++;
		}
		mth_element.textContent = months[month] + ' ' + year;
		populateDates();
		paintCallendar();
	}
	
	function goToPrevMonth (e) {
		if(month==currMonth) return;
		month--;
		if (month < 0) {
			month = 11;
			year--;
		}
		mth_element.textContent = months[month] + ' ' + year;
		populateDates();
		paintCallendar();
	}
	
	function populateDates (e) {
		var a= {path:"siga"};
		days_element.innerHTML = '';
		let amount_days = 31;
		if (month == 1) amount_days = 28;
		for (let i = 0; i < amount_days; i++) {
			var tempdDay, tempMonth;
			const day_element = document.createElement('div');
			if(i<9) tempdDay = "0"+(i+1);
			else tempdDay = (i+1);
			if(month<9) tempMonth = "0"+(month+1);
			else tempMonth = (month+1);
			day_element.id = tempdDay +" / "+tempMonth+" / "+year;
			day_element.onclick = function(){toggleDatePicker(a)};
			day_element.classList.add('day');
			day_element.textContent = i + 1;
			if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) day_element.classList.add('selected');
			day_element.addEventListener('click', function () {
				if((i+1)<currDay) return;
				selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
				selectedDay = (i + 1);
				selectedMonth = month;
				selectedYear = year;
				selected_date_element.textContent = formatDate(selectedDate);
				selected_date_element.dataset.value = selectedDate;
				populateDates();
				checkBookings(formatDate(selectedDate));
				getSeatsFromDate(selectedDay, selectedMonth, selectedYear);
			});
			days_element.appendChild(day_element);
		}
	}
	
	// HELPER FUNCTIONS
	function checkEventPathForClass (path, selector) {
		if(path=="siga") {
			return false;
		}
		for (let i = 0; i < path.length; i++) {
			if (path[i].classList && path[i].classList.contains(selector)) return true;
		}	
		return false;
	}
	
	function formatDate (d) {
		let day = d.getDate();
		if (day < 10) day = '0' + day;
		let month = d.getMonth() + 1;
		if (month < 10) month = '0' + month;
		let year = d.getFullYear();
		return day + ' / ' + month + ' / ' + year;
	}
};

function reserva(){
	var flag = 0;
	const selectedDate = document.getElementById('selected-date').innerHTML;
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
	if(adultCount==0 && criancaCount==0){
		document.getElementById('required5').innerHTML = "Selecione o número de bilhetes";
		flag=1;
	}else{
		document.getElementById('required5').innerHTML = "*";
	}
	if (flag==0){
		var time = ""
		console.log(selectedDate);
		if (cb1.checked)time = "9h-11h;";
		else if (cb2.checked)time = " 11h-13h;";
		else if (cb3.checked)time = " 14h-16h;";
		else if (cb4.checked)time = " 16h-18h;";
		else if (cb5.checked)time = " 18h-20h;";
		var fdt = cleanDate(selectedDate);
		var dia = fdt.d;
		var mes = fdt.m;
		var ano = fdt.a;
		sendReservation(dia, mes, ano, time, field1.value, field2.value, field3.value, field4.value, field5.value, tour);
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
	console.log("dia: ",dia);
	console.log("mes: ",mes);
	console.log("ano: ",ano);
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
	  body: JSON.stringify({y:ano, m:mes, d:dia, time:horas, fname:fname, lname:lname, mail:mail, tel:tel, text:text, seats:lugares,price:preco, type:type, boat:barco})
	};
	const res = await fetch('/Reservation', options);
	const data = await res.json();
	location.reload();
}
async function getBookings(date, time, fname, lname, mail, tel, text){
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({date:date, time:time, fname:fname, lname:lname, mail:mail, tel:tel, text:text})
	};
	const res = await fetch('/getBookings', options);
	const data = await res.json();
	var str = "<br>";
	console.log(data.bookings);
	allBookings = data.bookings;
	for (var i = 0; i < data.bookings.length; i++){
		str += JSON.stringify(data.bookings[i])+"<br>";
	}
	document.getElementById('current-bookings').innerHTML += str;
}

function checkBookings(data){
	const cb1 = document.getElementById('cb1');
	const cb2 = document.getElementById('cb2');
	const cb3 = document.getElementById('cb3');
	const cb4 = document.getElementById('cb4');
	const cb5 = document.getElementById('cb5');
	cb1.disabled = false;
	cb2.disabled = false;
	cb3.disabled = false;
	cb4.disabled = false;
	cb5.disabled = false;
	cb1.checked = false;
	cb2.checked = false;
	cb3.checked = false;
	cb4.checked = false;
	cb5.checked = false;
	var str = document.getElementById('current-bookings').innerHTML;
	var index1 = str.indexOf(data);
	var temp = str.substring(index1);
	var index2 = temp.indexOf("<br>");
	temp = temp.substring(0,index2);
	if (index1!=-1){
		if(temp.includes("9h-11h")) cb1.disabled = true;
		if(temp.includes("11h-13h")) cb2.disabled = true;
		if(temp.includes("14h-16h")) cb3.disabled = true;
		if(temp.includes("16h-18h")) cb4.disabled = true;
		if(temp.includes("18h-20h")) cb5.disabled = true;
	}
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
		if(dayDiv!=null) dayDiv.style.backgroundColor = "red"
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
	lugaresMax[0] = 10;
	lugaresMax[1] = 10;
	lugaresMax[2] = 10;
	lugaresMax[3] = 10;
	lugaresMax[4] = 10;
	var barco = 1;
	if(tour=="normal"){
		document.getElementById("cb1").checked = true;
		barco = 1;
	}else if(tour=="private"){
		document.getElementById("cbprivate").checked = true;
		barco = 2;
	}else if(tour=="express"){
		document.getElementById("cbexpress").checked = true;
		barco = 3;
	}
	var finaldate = selectedYear+'-'+(selectedMonth+1)+'-'+selectedDay;
	console.log(barco, finaldate);
	const options = {
		method: 'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({type:barco, date:finaldate})
	};
	const res = await fetch('/getDateBooking', options);
	const data = await res.json();
	if(tour=="normal"){
		console.log(data.bookings);
		if(data.bookings[0]==null){
			document.getElementById("cb1Text").innerHTML = " ("+ lugaresMax[0] + " lugares livres)";
			document.getElementById("cb2Text").innerHTML = " ("+ lugaresMax[1] + " lugares livres)";
			document.getElementById("cb3Text").innerHTML = " ("+ lugaresMax[2] + " lugares livres)";
			document.getElementById("cb4Text").innerHTML = " ("+ lugaresMax[3] + " lugares livres)";
			document.getElementById("cb5Text").innerHTML = " ("+ lugaresMax[4] + " lugares livres)";
		}
		for(var i = 0; i < data.bookings.length; i++){
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("9h-11h"))lugaresMax[0] = (10-data.bookings[i]["SUM(lugares)"]); 
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("11h-13h"))lugaresMax[1] = (10-data.bookings[i]["SUM(lugares)"]);
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("14h-16h"))lugaresMax[2] = (10-data.bookings[i]["SUM(lugares)"]);
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("16h-18h"))lugaresMax[3] = (10-data.bookings[i]["SUM(lugares)"]);
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("18h-20h"))lugaresMax[4] = (10-data.bookings[i]["SUM(lugares)"]);
			document.getElementById("cb1Text").innerHTML = " ("+ lugaresMax[0] + " lugares livres)";
			document.getElementById("cb2Text").innerHTML = " ("+ lugaresMax[1] + " lugares livres)";
			document.getElementById("cb3Text").innerHTML = " ("+ lugaresMax[2] + " lugares livres)";
			document.getElementById("cb4Text").innerHTML = " ("+ lugaresMax[3] + " lugares livres)";
			document.getElementById("cb5Text").innerHTML = " ("+ lugaresMax[4] + " lugares livres)";
		}
		maxSeats = lugaresMax[0];
	}else if(tour=="private"){
		barco = 2;
	}else if(tour=="express"){
		maxSeats=10;
		if (data.bookings[0]!=null) maxSeats = (10-data.bookings[0]["SUM(lugares)"]);
		document.getElementById("rExpressText").innerHTML = " ("+ maxSeats + " lugares livres)";
	}
	document.getElementById("adultonum").value=0;
	document.getElementById("ciancanum").value=0;
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
	console.log(adultCount, criancaCount, maxSeats);
	if(adultCount == 0) return
	adultCount--;
	document.getElementById("adultonum").value=adultCount;	
	console.log(adultCount, criancaCount, maxSeats);
}
function adultoMais(){
	console.log(adultCount, criancaCount, maxSeats);
	if((adultCount + criancaCount) > (maxSeats-1)) return
	adultCount++;
	document.getElementById("adultonum").value=adultCount;	
	console.log(adultCount, criancaCount, maxSeats);
}
function criancaMenos(){
	console.log(adultCount, criancaCount, maxSeats);
	if(criancaCount == 0) return
	criancaCount--;
	document.getElementById("ciancanum").value=criancaCount;	
	console.log(adultCount, criancaCount, maxSeats);
}
function criancaMais(){
	console.log(adultCount, criancaCount, maxSeats);
	if((adultCount + criancaCount) > (maxSeats-1)) return
	criancaCount++;
	document.getElementById("ciancanum").value=criancaCount;	
	console.log(adultCount, criancaCount, maxSeats);
}

function radioClick(radio){
	clearColors();
	if (radio=='1'){
		tour="normal";
		document.getElementById("normaltour").style.display = "block";
		document.getElementById("privatetour").style.display = "none";
		document.getElementById("expresstour").style.display = "none";
		document.getElementById("cb1").checked = false;
		document.getElementById("cb2").checked = false;
		document.getElementById("cb3").checked = false;
		document.getElementById("cb4").checked = false;
		document.getElementById("cb5").checked = false;
		document.getElementById("cb1").disabled = false;
		document.getElementById("cb2").disabled = false;
		document.getElementById("cb3").disabled = false;
		document.getElementById("cb4").disabled = false;
		document.getElementById("cb5").disabled = false;
		document.getElementById("lugares_adulto").style.display = "block";
		document.getElementById("lugares_crianca").style.display = "block";
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
		document.getElementById("cbprivate").checked = true;
		document.getElementById("cbprivate").disabled = true;
		document.getElementById("lugares_adulto").style.display = "none";
		document.getElementById("lugares_crianca").style.display = "none";
		document.getElementById("privatetourdiv").style.display = "block";
	}else{
		tour="express";
		document.getElementById("normaltour").style.display = "none";
		document.getElementById("privatetour").style.display = "none";
		document.getElementById("expresstour").style.display = "block";
		document.getElementById("cbexpress").checked = true;
		document.getElementById("cbexpress").disabled = true;
		document.getElementById("lugares_adulto").style.display = "block";
		document.getElementById("lugares_crianca").style.display = "block";
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
	adultCount=0;
	criancaCount=0;
	document.getElementById("adultonum").value=0;
	document.getElementById("ciancanum").value=0;
}
