// MENU hamburger
function showBurger() {
  var x = document.getElementById("menu__links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
/*
window.onscroll = function () {
	console.log(this.scrollY);
	const nav = document.getElementById('my_nav_menu');
	if(this.scrollY <= 500){
		console.log('blue');
		nav.style.color ="blue";  
	}else{
		console.log('red');
		nav.style.color ="red";
	}
}*/

/*
var feed = new Instafeed({
	get: '',
	tagName: '',
	clientId: 'eab7077abfb342b29a99b363f0e003a4'
});
feed.run();
*/

/*
window.onload = function() {
	var novaLargura = document.getElementById("rents__photo-2");

	document.getElementById("photo-1").height = (novaLargura.offsetWidth)/1.56;
	document.getElementById("photo-2").height = (novaLargura.offsetWidth)/1.56;
	document.getElementById("photo-3").height = (novaLargura.offsetWidth)/1.56;
	document.getElementById("photo-4").height = (novaLargura.offsetWidth)/1.56;
	document.getElementById("photo-5").height = (novaLargura.offsetWidth)/1.56;
	document.getElementById("photo-6").height = (novaLargura.offsetWidth)/1.56;
	
}*/

