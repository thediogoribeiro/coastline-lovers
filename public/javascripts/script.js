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
}
*/

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}





