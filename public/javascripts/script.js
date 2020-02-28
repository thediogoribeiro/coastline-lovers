// MENU hamburger
function showBurger(clas) {
  var x = document.getElementById(clas);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function openBooking(txt) {
  console.log(txt)
  document.getElementsById(txt).checked = true;

}

window.onscroll = function () {
  //console.log(this.scrollY);
  const nav = document.getElementById('icon__effect');
  if(this.scrollY <= 800){
    //console.log('branco');
    nav.style.color = '#FFFFFF';
    nav.style.borderColor = '#FFFFFF'; 
  }else{
    //console.log('azul');
    nav.style.color = '#0E3356';
    nav.style.borderColor = '#0E3356';
  }
}


//------- CAROUSEL BOOKING PAGE --------//

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
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}






